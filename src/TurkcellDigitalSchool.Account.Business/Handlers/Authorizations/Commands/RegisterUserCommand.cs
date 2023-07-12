using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using DotNetCore.CAP;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TurkcellDigitalSchool.Account.Business.Helpers;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.Common.Constants;
using TurkcellDigitalSchool.Core.Common.Helpers;
 
 
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.CrossCuttingConcerns.Logging.Serilog.Loggers;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Extensions;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Core.Utilities.Security.Hashing;
using TurkcellDigitalSchool.Core.Utilities.Security.Jwt; 

namespace TurkcellDigitalSchool.Account.Business.Handlers.Authorizations.Commands
{
    [TransactionScope]
    [LogScope]
    public class RegisterUserCommand : IRequest<DataResult<AccessToken>>
    {
        public UserType UserTypeId { get; set; }
        public long CitizenId { get; set; }
        public string Name { get; set; }
        public string SurName { get; set; }
        public string Email { get; set; }
        public string MobilePhones { get; set; }
        public string Password { get; set; }

        public class RegisterUserCommandHandler : IRequestHandler<RegisterUserCommand, DataResult<AccessToken>>
        {
            private readonly IUserRepository _userRepository;
            private readonly ISendOtpSmsHelper _sendOtpSmsHelper;
            private readonly ICapPublisher _capPublisher;

            public RegisterUserCommandHandler(IUserRepository userRepository, ISendOtpSmsHelper sendOtpSmsHelper, ICapPublisher capPublisher)
            {
                _userRepository = userRepository;
                _sendOtpSmsHelper = sendOtpSmsHelper;
                _capPublisher = capPublisher;
            }

            /// <summary>
            /// Will be reedited
            /// </summary> 
             
          
            public async Task<DataResult<AccessToken>> Handle(RegisterUserCommand request, CancellationToken cancellationToken)
            {
                HashingHelper.CreatePasswordHash(request.Password, out var passwordSalt, out var passwordHash);

                var citizenIdCheck = await _userRepository.GetAsync(w => w.Status && w.CitizenId == request.CitizenId && w.CitizenId != 0);
                if (citizenIdCheck != null)
                    return new ErrorDataResult<AccessToken>(Messages.CitizenIdAlreadyExist);

                var existEmail = await _userRepository.Query().AnyAsync(x => x.Email.Trim().ToLower() == request.Email.Trim().ToLower());
                if (existEmail)
                    return new ErrorDataResult<AccessToken>(Messages.EmailAlreadyExist);

                var existPhone = await _userRepository.Query().AnyAsync(x => x.MobilePhones == request.MobilePhones);
                if (existPhone)
                    return new ErrorDataResult<AccessToken>(Messages.MobilePhoneAlreadyExist);

                var user = new User
                {
                    UserType = request.UserTypeId,
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

                await _capPublisher.PublishAsync(user.GeneratePublishName(EntityState.Added),
                    user, cancellationToken: cancellationToken);

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