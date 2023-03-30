﻿using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TurkcellDigitalSchool.Account.Business.Handlers.Authorizations.ValidationRules;
using TurkcellDigitalSchool.Account.Business.Helpers;
using TurkcellDigitalSchool.Common.Constants;
using TurkcellDigitalSchool.Common.Helpers;
using TurkcellDigitalSchool.Core.Aspects.Autofac.Caching;
using TurkcellDigitalSchool.Core.Aspects.Autofac.Logging;
using TurkcellDigitalSchool.Core.Aspects.Autofac.Transaction;
using TurkcellDigitalSchool.Core.Aspects.Autofac.Validation;
using TurkcellDigitalSchool.Core.CrossCuttingConcerns.Logging.Serilog.Loggers;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Core.Utilities.Security.Hashing;
using TurkcellDigitalSchool.Core.Utilities.Security.Jwt;
using TurkcellDigitalSchool.Entities.Concrete.Core;
using TurkcellDigitalSchool.Identity.DataAccess.Abstract;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Authorizations.Commands
{
    public class RegisterUserCommand : IRequest<IDataResult<AccessToken>>
    {
        public UserTypeEnum UserTypeId { get; set; }
        public long CitizenId { get; set; }
        public string Name { get; set; }
        public string SurName { get; set; }
        public string Email { get; set; }
        public string MobilePhones { get; set; }
        public string Password { get; set; }

        public class RegisterUserCommandHandler : IRequestHandler<RegisterUserCommand, IDataResult<AccessToken>>
        {
            private readonly IUserRepository _userRepository;          
            private readonly ISendOtpSmsHelper _sendOtpSmsHelper;

            public RegisterUserCommandHandler(IUserRepository userRepository, ISendOtpSmsHelper sendOtpSmsHelper )
            {
                _userRepository = userRepository;
                _sendOtpSmsHelper = sendOtpSmsHelper;
            }

            /// <summary>
            /// Will be reedited
            /// </summary>
            [ValidationAspect(typeof(RegisterUserValidator), Priority = 2)]
            [CacheRemoveAspect("Get")]
            [LogAspect(typeof(FileLogger))]
            [TransactionScopeAspectAsync]
            public async Task<IDataResult<AccessToken>> Handle(RegisterUserCommand request, CancellationToken cancellationToken)
            {
                HashingHelper.CreatePasswordHash(request.Password, out var passwordSalt, out var passwordHash);

                var citizenIdCheck = await _userRepository.GetAsync(w => w.Status && w.CitizenId == request.CitizenId && w.CitizenId != 0);
                if (citizenIdCheck != null)
                    return new ErrorDataResult<AccessToken>(Messages.CitizenIdAlreadyExist);

                var email = await _userRepository.Query().AnyAsync(x => x.Email.Trim().ToLower() == request.Email.Trim().ToLower());
                if (email)
                    return new ErrorDataResult<AccessToken>(Messages.EmailAlreadyExist);

                var phone = await _userRepository.Query().AnyAsync(x => x.MobilePhones != request.MobilePhones);
                if (phone)
                    return new ErrorDataResult<AccessToken>(Messages.MobilePhoneAlreadyExist);

                var user = new User
                {
                    UserTypeEnum = request.UserTypeId,
                    CitizenId = request.CitizenId,
                    Name = request.Name,
                    SurName = request.SurName,
                    Email = request.Email,
                    MobilePhones = request.MobilePhones,                    
                    PasswordHash = passwordHash,
                    PasswordSalt = passwordSalt
                };

                _userRepository.Add(user);
                await _userRepository.SaveChangesAsync();

                MobileLogin mobileLogin;

                try
                {
                    mobileLogin = await _sendOtpSmsHelper.SendOtpSms(AuthenticationProviderType.Person, user.MobilePhones, user.Id);
                }
                catch (Exception e)
                {
                    return new ErrorDataResult<AccessToken>(e.Message);
                }

                return new SuccessDataResult<AccessToken>(
                    new AccessToken
                    {
                        Token = mobileLogin.Id.ToString(),
                        Claims = new List<string> { mobileLogin.Code.ToString() },
                        Msisdn = mobileLogin.CellPhone.getSecretCellPhone(),
                        Expiration = mobileLogin.LastSendDate.AddSeconds(120)
                    }, Messages.SendMobileCodeSuccessfully);
            }
        }
    }
}