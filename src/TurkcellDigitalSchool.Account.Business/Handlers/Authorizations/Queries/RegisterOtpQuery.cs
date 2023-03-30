using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Http;
using TurkcellDigitalSchool.Account.Business.Services.Authentication;
using TurkcellDigitalSchool.Common;
using TurkcellDigitalSchool.Common.Constants;
using TurkcellDigitalSchool.Core.Aspects.Autofac.Logging;
using TurkcellDigitalSchool.Core.Aspects.Autofac.Transaction;
using TurkcellDigitalSchool.Core.CrossCuttingConcerns.Caching;
using TurkcellDigitalSchool.Core.CrossCuttingConcerns.Logging.Serilog.Loggers;
using TurkcellDigitalSchool.Core.Entities.Dtos;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Core.Utilities.Security.Jwt;
using TurkcellDigitalSchool.Entities.Concrete.Core;
using TurkcellDigitalSchool.Identity.DataAccess.Abstract;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Authorizations.Queries
{
    public class RegisterOtpQuery : IRequest<IDataResult<AccessToken>>, ITokenRequest
    {
        public long MobileLoginId { get; set; }
        public int Otp { get; set; }
        public SessionType SessionType { get; set; }

        public class RegisterOtpQueryHandler : IRequestHandler<RegisterOtpQuery, IDataResult<AccessToken>>
        {
            private readonly ConfigurationManager _configurationManager;
            private readonly IUserRepository _userRepository;
            private readonly ITokenHelper _tokenHelper;
            private readonly ICacheManager _cacheManager;
            private readonly IMobileLoginRepository _mobileLoginRepository;
            private readonly ISmsOtpRepository _smsOtpRepository;
            private readonly IUserSessionRepository _userSessionRepository;
            private readonly IHttpContextAccessor _httpContextAccessor;

            public RegisterOtpQueryHandler(IUserRepository userRepository, ITokenHelper tokenHelper, ICacheManager cacheManager, IMobileLoginRepository mobileLoginRepository, ISmsOtpRepository smsOtpRepository, ConfigurationManager configurationManager, IUserSessionRepository userSessionRepository, IHttpContextAccessor httpContextAccessor)
            {
                _userRepository = userRepository;
                _tokenHelper = tokenHelper;
                _cacheManager = cacheManager;
                _mobileLoginRepository = mobileLoginRepository;
                _smsOtpRepository = smsOtpRepository;
                _configurationManager = configurationManager;
                _userSessionRepository = userSessionRepository;
                _httpContextAccessor = httpContextAccessor;
            }

            [TransactionScopeAspectAsync]
            [LogAspect(typeof(FileLogger))]
            public async Task<IDataResult<AccessToken>> Handle(RegisterOtpQuery request, CancellationToken cancellationToken)
            {
                try
                {
                    DateTime date = DateTime.Now;

                    var mobileLogin = await _mobileLoginRepository.GetAsync(m => m.Provider == AuthenticationProviderType.Person &&
                                                            m.Code == request.Otp &&
                                                            m.Id == request.MobileLoginId &&
                                                            m.LastSendDate.AddSeconds(120) > date &&
                                                            m.Status == MobileSendStatus.Send);

                    if (mobileLogin == null)
                    {
                        return new ErrorDataResult<DArchToken>(Messages.InvalidOtp);
                    }

                    var user = await _userRepository.GetAsync(u => u.Id == mobileLogin.UserId);
                    if (user == null)
                    {
                        return new ErrorDataResult<AccessToken>(Messages.PassError);
                    }

                    var ip = _httpContextAccessor.HttpContext.Connection.RemoteIpAddress.ToString();
                    var addedSessionRecord = _userSessionRepository.AddUserSession(new UserSession
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
                        SessionId = addedSessionRecord.Id,
                    });

                    addedSessionRecord.NotBefore = accessToken.NotBefore;
                    _userSessionRepository.UpdateAndSave(addedSessionRecord);

                    mobileLogin.Status = MobileSendStatus.Used;
                    mobileLogin.UsedDate = date;
                    _mobileLoginRepository.Update(mobileLogin);
                    await _mobileLoginRepository.SaveChangesAsync();

                    if (_configurationManager.Mode != ApplicationMode.LOCAL && _configurationManager.Mode != ApplicationMode.STB && _configurationManager.Mode != ApplicationMode.DEV)
                    {
                        await _smsOtpRepository.ExecUpdateSpForSms(user.MobilePhones, user.Id, mobileLogin.Code.ToString());
                    }

                    user.RegisterStatus = RegisterStatus.Registered;
                    user.Status = true;
                    _userRepository.Update(user);
                    await _userRepository.SaveChangesAsync();

                    return new SuccessDataResult<DArchToken>(accessToken, Messages.SuccessfulLogin);
                }
                catch (Exception e)
                {
                    return new ErrorDataResult<DArchToken>(e.Message);
                }
            }
        }
    }
}
