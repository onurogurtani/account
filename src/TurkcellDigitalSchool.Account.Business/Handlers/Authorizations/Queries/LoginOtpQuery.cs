using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Http;
using TurkcellDigitalSchool.Account.Business.Constants;
using TurkcellDigitalSchool.Account.Business.Services.Authentication;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Common;
using TurkcellDigitalSchool.Core.Aspects.Autofac.Logging;
using TurkcellDigitalSchool.Core.CrossCuttingConcerns.Caching;
using TurkcellDigitalSchool.Core.CrossCuttingConcerns.Logging.Serilog.Loggers;
using TurkcellDigitalSchool.Core.Entities.Dtos;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Services.SMS.Turkcell;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Core.Utilities.Security.Jwt; 

namespace TurkcellDigitalSchool.Account.Business.Handlers.Authorizations.Queries
{
    public class LoginOtpQuery : IRequest<IDataResult<DArchToken>>, ITokenRequest
    {
        public long MobileLoginId { get; set; }
        public int Otp { get; set; }
        public SessionType SessionType { get; set; }

        public class LoginOtpQueryHandler : IRequestHandler<LoginOtpQuery, IDataResult<DArchToken>>
        {
            private readonly ConfigurationManager _configurationManager;
            private readonly IUserRepository _userRepository;
            private readonly ITokenHelper _tokenHelper;
            private readonly ICacheManager _cacheManager;
            private readonly IMobileLoginRepository _mobileLoginRepository;
            private readonly ISmsOtpRepository _smsOtpRepository;
            private readonly IUserSessionRepository _userSessionRepository;
            private readonly IAppSettingRepository _appSettingRepository;
            private readonly IHttpContextAccessor _httpContextAccessor;

            public LoginOtpQueryHandler(IUserRepository userRepository, ITokenHelper tokenHelper, ICacheManager cacheManager, IMobileLoginRepository mobileLoginRepository, ISmsOtpRepository smsOtpRepository, ConfigurationManager configurationManager, IUserSessionRepository userSessionRepository, IAppSettingRepository appSettingRepository, IHttpContextAccessor httpContextAccessor)
            {
                _userRepository = userRepository;
                _tokenHelper = tokenHelper;
                _cacheManager = cacheManager;
                _mobileLoginRepository = mobileLoginRepository;
                _smsOtpRepository = smsOtpRepository;
                _configurationManager = configurationManager;
                _userSessionRepository = userSessionRepository;
                _appSettingRepository = appSettingRepository;
                _httpContextAccessor = httpContextAccessor;

            }

            [LogAspect(typeof(FileLogger))]
            public async Task<IDataResult<DArchToken>> Handle(LoginOtpQuery request, CancellationToken cancellationToken)
            {
                try
                {
                    DateTime date = DateTime.Now;

                    var mobileLogin = await _mobileLoginRepository.GetAsync(m => m.Provider == AuthenticationProviderType.Person &&
                                                            m.Code == request.Otp &&
                                                            m.Id == request.MobileLoginId &&
                                                            m.LastSendDate.AddSeconds(120) > date &&
                                                            m.Status == UsedStatus.Send);

                    if (mobileLogin == null)
                    {
                        return new ErrorDataResult<DArchToken>(Messages.UnableToProccess);
                    }

                    var user = await _userRepository.GetAsync(u => u.Id == mobileLogin.UserId && u.Status);

                    if (user == null)
                    {
                        return new ErrorDataResult<DArchToken>(Messages.PassError);
                    }

                    var isOldPassword = await IsOldPassword(mobileLogin.UserId);
                    if (isOldPassword == true)
                    {
                        return new ErrorDataResult<DArchToken>(new DArchToken { IsOldPassword = true }, Common.Constants.Messages.TryAgain);
                    }

                    var ip = _httpContextAccessor.HttpContext.Connection.RemoteIpAddress.ToString();
                    var addedSession = _userSessionRepository.AddUserSession(new UserSession
                    {
                        UserId = user.Id,
                        NotBefore = 1,
                        SessionType = request.SessionType,
                        StartTime = DateTime.Now,
                        IpAdress = ip
                    });
                     
                    var accessToken = _tokenHelper.CreateToken<DArchToken>(new TokenDto
                    {
                        User = user,
                        SessionType = request.SessionType,
                        SessionId = addedSession.Id
                    });

                    addedSession.NotBefore = accessToken.NotBefore;
                    _userSessionRepository.UpdateAndSave(addedSession);

                    mobileLogin.Status = UsedStatus.Used;
                    mobileLogin.UsedDate = date;

                    _mobileLoginRepository.Update(mobileLogin);
                    await _mobileLoginRepository.SaveChangesAsync();

                    if (_configurationManager.Mode != ApplicationMode.LOCAL && _configurationManager.Mode != ApplicationMode.DEV && _configurationManager.Mode != ApplicationMode.STB)
                    {
                        // Eski boş servis
                        // await _smsOtpRepository.ExecUpdateSpForSms(user.MobilePhones, user.Id, mobileLogin.Code.ToString());
                        await _smsOtpRepository.SendSms(user.MobilePhones, $"DIJITAL DERSHANE SIFRENIZ: {mobileLogin.Code.ToString()}");
                        
                    } 
                    return new SuccessDataResult<DArchToken>(accessToken, Messages.SuccessfulLogin); 
                }
                catch (Exception e)
                {
                    return new ErrorDataResult<DArchToken>(e.Message);
                }
            }

            private async Task<bool> IsOldPassword(long UserId)
            {
                var value = _appSettingRepository.Query().Where(x => x.Code == "PasswordRefreshPeriod").Select(x => x.Value).FirstOrDefault();
                if (Int32.Parse(value) > 0)
                {
                    var users = await _userRepository.GetAsync(w => w.Id == UserId);
                    if (users.LastPasswordDate.AddMonths(Int32.Parse(value)) < DateTime.Now)
                    {
                        return true;
                    }
                }
                return false;
            }
        }
    }
}
