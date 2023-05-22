using System;
using System.Threading;
using System.Threading.Tasks;
using DotNetCore.CAP;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using TurkcellDigitalSchool.Account.Business.Services.Authentication;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Common;
using TurkcellDigitalSchool.Common.Constants;
using TurkcellDigitalSchool.Core.Aspects.Autofac.Logging; 
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.CrossCuttingConcerns.Caching;
using TurkcellDigitalSchool.Core.CrossCuttingConcerns.Logging.Serilog.Loggers;
using TurkcellDigitalSchool.Core.Entities.Dtos;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Extensions;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Core.Utilities.Security.Jwt; 

namespace TurkcellDigitalSchool.Account.Business.Handlers.Authorizations.Queries
{

    [TransactionScope]
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
            private readonly ICapPublisher _capPublisher;
            public RegisterOtpQueryHandler(IUserRepository userRepository, ITokenHelper tokenHelper, ICacheManager cacheManager, IMobileLoginRepository mobileLoginRepository, ISmsOtpRepository smsOtpRepository, ConfigurationManager configurationManager, IUserSessionRepository userSessionRepository, IHttpContextAccessor httpContextAccessor, ICapPublisher capPublisher)
            {
                _userRepository = userRepository;
                _tokenHelper = tokenHelper;
                _cacheManager = cacheManager;
                _mobileLoginRepository = mobileLoginRepository;
                _smsOtpRepository = smsOtpRepository;
                _configurationManager = configurationManager;
                _userSessionRepository = userSessionRepository;
                _httpContextAccessor = httpContextAccessor;
                _capPublisher = capPublisher;
            }

          
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
                                                            m.Status == UsedStatus.Send);

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

                    mobileLogin.Status = UsedStatus.Used;
                    mobileLogin.UsedDate = date;
                    _mobileLoginRepository.Update(mobileLogin);
                    await _mobileLoginRepository.SaveChangesAsync();

                    if ( _configurationManager.Mode != ApplicationMode.DEV)
                    {
                        await _smsOtpRepository.ExecUpdateSpForSms(user.MobilePhones, user.Id, mobileLogin.Code.ToString());
                    }

                    user.RegisterStatus = RegisterStatus.Registered;
                    user.Status = true;
                    _userRepository.Update(user);
                    await _userRepository.SaveChangesAsync();

                    await _capPublisher.PublishAsync(user.GeneratePublishName(EntityState.Added),
                        user, cancellationToken: cancellationToken);


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
