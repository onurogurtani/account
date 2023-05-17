using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using TurkcellDigitalSchool.Account.Business.Constants;
using TurkcellDigitalSchool.Account.Business.Handlers.Authorizations.ValidationRules;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Common;
using TurkcellDigitalSchool.Common.Helpers;
using TurkcellDigitalSchool.Core.Aspects.Autofac.Logging; 
using TurkcellDigitalSchool.Core.CrossCuttingConcerns.Logging.Serilog.Loggers;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Core.Utilities.Security.Hashing;
using TurkcellDigitalSchool.Core.Utilities.Security.Jwt;
using TurkcellDigitalSchool.Core.Utilities.Toolkit; 

namespace TurkcellDigitalSchool.Account.Business.Handlers.Authorizations.Commands
{
    public class ForgottenPasswordChangeCommand : IRequest<IDataResult<AccessToken>>
    {

        public string Token { get; set; }
        public string NewPassword { get; set; }

        public class ForgottenPasswordChangeCommandHandler : IRequestHandler<ForgottenPasswordChangeCommand, IDataResult<AccessToken>>
        {
            private readonly ConfigurationManager _configurationManager;
            private readonly IUserRepository _userRepository;
            private readonly IMediator _mediator;
            private readonly IMobileLoginRepository _mobileLoginRepository;
            private readonly ISmsOtpRepository _smsOtpRepository;
            private readonly IUserSessionRepository _userSessionRepository;

            public ForgottenPasswordChangeCommandHandler(IUserRepository userRepository, IMediator mediator, IMobileLoginRepository mobileLoginRepository, ISmsOtpRepository smsOtpRepository, ConfigurationManager configurationManager, IUserSessionRepository userSessionRepository)
            {
                _userRepository = userRepository;
                _mediator = mediator;
                _mobileLoginRepository = mobileLoginRepository;
                _smsOtpRepository = smsOtpRepository;
                _configurationManager = configurationManager;
                _userSessionRepository = userSessionRepository;
            }

            /// <summary>
            /// Forgotten Password Token Check 
            /// Token check is done.
            /// If the check is successful, the new password is updated to the user account.
            /// A verification code is sent to the phone for the sms verification page.
            /// </summary>
           
            [LogAspect(typeof(FileLogger))]
            public async Task<IDataResult<AccessToken>> Handle(ForgottenPasswordChangeCommand request, CancellationToken cancellationToken)
            {
                var userSessionRepository = _mediator.Send(new ForgottenPasswordTokenCheckCommand { Token = request.Token }, cancellationToken).Result.Data;

                if (userSessionRepository == null || userSessionRepository.User == null)
                {
                    return new ErrorDataResult<AccessToken>("İşlem Geçersiz.");
                }

                User user = userSessionRepository.User;

                HashingHelper.CreatePasswordHash(request.NewPassword, out var passwordSalt, out var passwordHash);
                user.PasswordHash = passwordHash;
                user.PasswordSalt = passwordSalt;
                user.LastPasswordDate = DateTime.UtcNow;

                _userRepository.Update(user);
                await _userRepository.SaveChangesAsync();

                MobileLogin mobileLogin;

                try
                {
                    mobileLogin = await SendOtpSms(AuthenticationProviderType.Person, user.MobilePhones, user.Id);
                }
                catch (Exception e)
                {
                    return new ErrorDataResult<AccessToken>(e.Message);
                }

                userSessionRepository.LastTokenDate = DateTime.UtcNow;
                _userSessionRepository.Update(userSessionRepository);
                await _userSessionRepository.SaveChangesAsync();

                return new SuccessDataResult<AccessToken>(
                    new AccessToken
                    {
                        Token = mobileLogin.Id.ToString(),
                        Claims = new List<string> { mobileLogin.Code.ToString() },
                        Msisdn = mobileLogin.CellPhone.getSecretCellPhone(),
                        Expiration = mobileLogin.LastSendDate.AddSeconds(120)
                    }, Messages.SendMobileCodeSuccessfully);
            }

            private async Task<MobileLogin> SendOtpSms(AuthenticationProviderType providerType, string cellPhone, long userId)
            {
                var date = DateTime.Now;

                var mobileLogins = _mobileLoginRepository.Query()
                    .Where(m => m.Provider == providerType && m.UserId == userId && m.Status == UsedStatus.Send)
                    .Where(w => w.SendDate.AddSeconds(120) > date)
                    .ToList();

                if (mobileLogins.Count > 0)
                {
                    foreach (var item in mobileLogins)
                    {
                        item.Status = UsedStatus.Cancelled;
                        _mobileLoginRepository.Update(item);
                    }
                    await _mobileLoginRepository.SaveChangesAsync();
                }

                int otp = RandomPassword.RandomNumberGenerator();
                if (_configurationManager.Mode == ApplicationMode.PRP)
                    otp = 123456;

                if (_configurationManager.Mode != ApplicationMode.LOCAL && _configurationManager.Mode != ApplicationMode.DEV && _configurationManager.Mode != ApplicationMode.STB)
                {
                    // Eski boş servis
                    // await _smsOtpRepository.ExecInsertSpForSms(user.MobilePhones, user.Id, guid);
                    await _smsOtpRepository.SendSms(cellPhone, $"DIJITAL DERSHANE SIFRENIZ: {otp}");
                }

                date = DateTime.Now;

                var mobileLogin = _mobileLoginRepository.Add(new MobileLogin
                {
                    Code = otp,
                    Status = UsedStatus.Send,
                    SendDate = date,
                    LastSendDate = date,
                    UserId = userId,
                    Provider = providerType,
                    CellPhone = cellPhone,
                    ReSendCount = 0
                });
                await _mobileLoginRepository.SaveChangesAsync();

                return mobileLogin;
            }
        }
    }
}

