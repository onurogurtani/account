using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Refit;
using TurkcellDigitalSchool.Account.Business.Constants;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Common;
using TurkcellDigitalSchool.Common.Helpers;
using TurkcellDigitalSchool.Core.Aspects.Autofac.Logging;
using TurkcellDigitalSchool.Core.CrossCuttingConcerns.Logging.Serilog.Loggers;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Core.Utilities.Security.Captcha;
using TurkcellDigitalSchool.Core.Utilities.Security.Hashing;
using TurkcellDigitalSchool.Core.Utilities.Security.Jwt;
using TurkcellDigitalSchool.Core.Utilities.Toolkit;
using TurkcellDigitalSchool.Entities.Concrete.Core; 

namespace TurkcellDigitalSchool.Account.Business.Handlers.Authorizations.Queries
{
    public class LoginUserQuery : IRequest<IDataResult<AccessToken>>
    {
        public long CitizenId { get; set; }
        public string Password { get; set; }
        public string CaptchaKey { get; set; }

        public class LoginUserQueryHandler : IRequestHandler<LoginUserQuery, IDataResult<AccessToken>>
        {
            private readonly ConfigurationManager _configurationManager;
            private readonly IUserRepository _userRepository;
            private readonly IMobileLoginRepository _mobileLoginRepository;
            private readonly ISmsOtpRepository _smsOtpRepository;
            private readonly ICaptchaManager _captchaManager;

            public LoginUserQueryHandler(IUserRepository userRepository, IMobileLoginRepository mobileLoginRepository, ISmsOtpRepository smsOtpRepository, ConfigurationManager configurationManager, ICaptchaManager captchaManager)
            {
                _userRepository = userRepository;
                _mobileLoginRepository = mobileLoginRepository;
                _smsOtpRepository = smsOtpRepository;
                _configurationManager = configurationManager;
                _captchaManager = captchaManager;
            }


            [LogAspect(typeof(FileLogger))]
            public async Task<IDataResult<AccessToken>> Handle(LoginUserQuery request, CancellationToken cancellationToken)
            {
                if (!(_configurationManager.Mode != ApplicationMode.PROD && request.CaptchaKey == "kg"))
                {
                    if (!_captchaManager.Validate(request.CaptchaKey))
                    {
                        return new ErrorDataResult<AccessToken>(Messages.InvalidCaptchaKey);
                    }
                }

                var user = await _userRepository.GetAsync(u => u.CitizenId == request.CitizenId && u.Status);

                if (user == null)
                {
                    return new ErrorDataResult<AccessToken>(Messages.PassError);
                } 

                if (!HashingHelper.VerifyPasswordHash(request.Password, user.PasswordSalt, user.PasswordHash))
                {
                    try
                    {
                        user.FailLoginCount = (user.FailLoginCount ?? 0) + 1;
                        _userRepository.Update(user);
                        await _userRepository.SaveChangesAsync();
                        return new ErrorDataResult<AccessToken>(Messages.PassError + " " + string.Format(Messages.FailLoginCount, user.FailLoginCount));
                    }
                    catch (Exception e)
                    {
                        Console.WriteLine(e);
                        throw;
                    }
                  
                    
                }

                if ((user.FailLoginCount ?? 0) > 0)
                {
                    user.FailLoginCount = 0;
                    _userRepository.Update(user);
                    await _userRepository.SaveChangesAsync();
                }

                MobileLogin mobileLogin;

                try
                {
                    mobileLogin = await SendOtpSms(AuthenticationProviderType.Person, user.MobilePhones, user.Id);
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

            private async Task<MobileLogin> SendOtpSms(AuthenticationProviderType providerType, string cellPhone, long userId)
            {
                var date = DateTime.Now;

                var mobileLogins = _mobileLoginRepository.Query()
                    .Where(m => m.Provider == providerType && m.UserId == userId && m.Status == MobileSendStatus.Send)
                    .Where(w => w.SendDate.AddSeconds(120) > date)
                    .ToList();

                if (mobileLogins.Count > 0)
                {
                    foreach (var item in mobileLogins)
                    {
                        item.Status = MobileSendStatus.Cancelled;
                        _mobileLoginRepository.Update(item);
                    }
                    await _mobileLoginRepository.SaveChangesAsync();
                }

                int otp = RandomPassword.RandomNumberGenerator();
                if (_configurationManager.Mode == ApplicationMode.DEV)
                    otp = 123456;

                if (_configurationManager.Mode != ApplicationMode.LOCAL && _configurationManager.Mode != ApplicationMode.DEV && _configurationManager.Mode != ApplicationMode.STB)
                {
                    await _smsOtpRepository.ExecInsertSpForSms(cellPhone, userId, otp.ToString());
                }

                date = DateTime.Now;

                var mobileLogin = _mobileLoginRepository.Add(new MobileLogin
                {
                    Code = otp,
                    Status = MobileSendStatus.Send,
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
