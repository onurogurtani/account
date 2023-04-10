﻿using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using DocumentFormat.OpenXml.Spreadsheet;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TurkcellDigitalSchool.Account.Business.Handlers.Authorizations.ValidationRules;
using TurkcellDigitalSchool.Account.Business.Helpers;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.DataAccess.Concrete.EntityFramework;
using TurkcellDigitalSchool.Common.Constants;
using TurkcellDigitalSchool.Common.Helpers;
using TurkcellDigitalSchool.Core.Aspects.Autofac.Caching;
using TurkcellDigitalSchool.Core.Aspects.Autofac.Logging;
using TurkcellDigitalSchool.Core.Aspects.Autofac.Transaction;
using TurkcellDigitalSchool.Core.Aspects.Autofac.Validation;
using TurkcellDigitalSchool.Core.CrossCuttingConcerns.Logging.Serilog.Loggers;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.Mail;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Core.Utilities.Security.Hashing;
using TurkcellDigitalSchool.Core.Utilities.Security.Jwt;
using TurkcellDigitalSchool.Core.Utilities.Toolkit;
using TurkcellDigitalSchool.Entities.Concrete;
using TurkcellDigitalSchool.Entities.Concrete.Core;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Authorizations.Commands
{
    public class UnverifiedUserCommand : IRequest<IDataResult<UnverifiedUser>>
    {
        public UserType UserTypeId { get; set; }
        public long CitizenId { get; set; }
        public string Name { get; set; }
        public string SurName { get; set; }
        public string Email { get; set; }
        public string MobilePhones { get; set; }
        public string Password { get; set; }

        public class UnverifiedUserCommandCommandHandler : IRequestHandler<UnverifiedUserCommand, IDataResult<UnverifiedUser>>
        {
            private readonly IUnverifiedUserRepository _unverifiedUserRepository;
            private readonly IUserRepository _userRepository;
            private readonly ISendOtpSmsHelper _sendOtpSmsHelper;
            private readonly IMailService _mailService;

            public UnverifiedUserCommandCommandHandler(IUnverifiedUserRepository unverifiedUserRepository, ISendOtpSmsHelper sendOtpSmsHelper, IUserRepository userRepository, IMailService mailService)
            {
                _unverifiedUserRepository = unverifiedUserRepository;
                _sendOtpSmsHelper = sendOtpSmsHelper;
                _userRepository = userRepository;
                _mailService = mailService;
            }

            /// <summary>
            /// Will be reedited
            /// </summary>
            [ValidationAspect(typeof(RegisterUserValidator), Priority = 2)]
            [CacheRemoveAspect("Get")]
            [LogAspect(typeof(FileLogger))]
            [TransactionScopeAspectAsync]
            public async Task<IDataResult<UnverifiedUser>> Handle(UnverifiedUserCommand request, CancellationToken cancellationToken)
            {
                HashingHelper.CreatePasswordHash(request.Password, out var passwordSalt, out var passwordHash);

                var citizenIdCheck = await _userRepository.GetAsync(w => w.Status && w.CitizenId == request.CitizenId && w.CitizenId != 0);
                if (citizenIdCheck != null)
                    return new ErrorDataResult<UnverifiedUser>(Messages.CitizenIdAlreadyExist);

                var existEmail = await _userRepository.Query().AnyAsync(x => x.Email.Trim().ToLower() == request.Email.Trim().ToLower());
                if (existEmail)
                    return new ErrorDataResult<UnverifiedUser>(Messages.EmailAlreadyExist);

                var existPhone = await _userRepository.Query().AnyAsync(x => x.MobilePhones == request.MobilePhones);
                if (existPhone)
                    return new ErrorDataResult<UnverifiedUser>(Messages.MobilePhoneAlreadyExist);

                var unverifiedExistEmail = await _unverifiedUserRepository.Query().AnyAsync(x => x.Email.Trim().ToLower() == request.Email.Trim().ToLower());
                if (existEmail)
                {
                    var unverifiedUserEmail =  _unverifiedUserRepository.Get(x => x.Email.Trim().ToLower() == request.Email.Trim().ToLower());
                     _unverifiedUserRepository.Delete(new UnverifiedUser { Id= unverifiedUserEmail.Id});
                }

                var unverifiedExistMobilePhone = await _unverifiedUserRepository.Query().AnyAsync(x => x.Email.Trim().ToLower() == request.Email.Trim().ToLower());
                if (existEmail)
                {
                    var unverifiedUserMobilePhone = _unverifiedUserRepository.Get(x => x.MobilePhones.Trim() == request.Email.Trim());
                    _unverifiedUserRepository.Delete(new UnverifiedUser { Id = unverifiedUserMobilePhone.Id });
                }

                var unverifiedExistCitizenId = await _unverifiedUserRepository.Query().AnyAsync(x => x.Email.Trim().ToLower() == request.Email.Trim().ToLower());
                if (existEmail)
                {
                    var unverifiedUserCitizenId = _unverifiedUserRepository.Get(x => x.CitizenId == request.CitizenId);
                    _unverifiedUserRepository.Delete(new UnverifiedUser { Id = unverifiedUserCitizenId.Id });
                }


                var unverifiedUser = new UnverifiedUser
                {
                    UserTypeId = request.UserTypeId,
                    CitizenId = request.CitizenId,
                    Name = request.Name,
                    SurName = request.SurName,
                    Email = request.Email,
                    MobilePhones = request.MobilePhones,
                    PasswordHash = passwordHash,
                    PasswordSalt = passwordSalt
                };


                if (unverifiedUser.UserTypeId == UserType.Student)
                {
                    unverifiedUser.VerificationKey = RandomPassword.RandomNumberGenerator().ToString();
                    var content = $" Üyelik doğrulama kodu: {unverifiedUser.VerificationKey} ";

                    _mailService.Send(new EmailMessage
                    {
                        Subject = "Üyelik Doğrulama",
                        ToAddresses = new System.Collections.Generic.List<EmailAddress> { new EmailAddress { Address = unverifiedUser.Email } },
                        Content = content
                    });
                }
                else
                {
                    MobileLogin mobileLogin;

                    try
                    {
                        mobileLogin = await _sendOtpSmsHelper.SendOtpSms(AuthenticationProviderType.Person, unverifiedUser.MobilePhones, unverifiedUser.Id);
                        unverifiedUser.VerificationKey = mobileLogin.Code.ToString();
                    }
                    catch (Exception e)
                    {
                        return new ErrorDataResult<UnverifiedUser>(e.Message);
                    }

                        
                }

                _unverifiedUserRepository.Add(unverifiedUser);
                await _unverifiedUserRepository.SaveChangesAsync();
                    return new SuccessDataResult<UnverifiedUser>(unverifiedUser);

            }

        }
    }
}