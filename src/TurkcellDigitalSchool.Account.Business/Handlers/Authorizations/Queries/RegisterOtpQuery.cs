using System;
using System.Threading;
using System.Threading.Tasks; 
using MediatR;
using Microsoft.AspNetCore.Http; 
using TurkcellDigitalSchool.Account.Business.Services.Authentication;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.Common;
using TurkcellDigitalSchool.Core.Common.Constants;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute; 
using TurkcellDigitalSchool.Core.Entities.Dtos;
using TurkcellDigitalSchool.Core.Enums; 
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Core.Utilities.Security.Jwt; 

namespace TurkcellDigitalSchool.Account.Business.Handlers.Authorizations.Queries
{

    [TransactionScope]
    [LogScope]
    public class RegisterOtpQuery : IRequest<DataResult<AccessToken>>, ITokenRequest
    {
        public long MobileLoginId { get; set; }
        public int Otp { get; set; }
        public SessionType SessionType { get; set; }

        public class RegisterOtpQueryHandler : IRequestHandler<RegisterOtpQuery, DataResult<AccessToken>>
        {
            private readonly ConfigurationManager _configurationManager;
            private readonly IUserRepository _userRepository;
            private readonly ITokenHelper _tokenHelper; 
            private readonly IMobileLoginRepository _mobileLoginRepository;
            private readonly ISmsOtpRepository _smsOtpRepository;
            private readonly IUserSessionRepository _userSessionRepository;
            private readonly IHttpContextAccessor _httpContextAccessor; 
            public RegisterOtpQueryHandler(IUserRepository userRepository, ITokenHelper tokenHelper,
                IMobileLoginRepository mobileLoginRepository, ISmsOtpRepository smsOtpRepository, ConfigurationManager configurationManager, IUserSessionRepository userSessionRepository, IHttpContextAccessor httpContextAccessor )
            {
                _userRepository = userRepository;
                _tokenHelper = tokenHelper; 
                _mobileLoginRepository = mobileLoginRepository;
                _smsOtpRepository = smsOtpRepository;
                _configurationManager = configurationManager;
                _userSessionRepository = userSessionRepository;
                _httpContextAccessor = httpContextAccessor; 
            } 
            public async Task<DataResult<AccessToken>> Handle(RegisterOtpQuery request, CancellationToken cancellationToken)
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
                        return new ErrorDataResult<AccessToken>(Messages.InvalidOtp);
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
                        // Eski boş SMS kodu
                        // await _smsOtpRepository.ExecUpdateSpForSms(user.MobilePhones, user.Id, mobileLogin.Code.ToString());
                        // SMS servisi
                        await _smsOtpRepository.Send(user.MobilePhones, $"Şifreniz: {mobileLogin.Code.ToString()}");
                    }

                    user.RegisterStatus = RegisterStatus.Registered;
                    user.Status = true;
                    _userRepository.Update(user);
                    await _userRepository.SaveChangesAsync();
                     
                    return new SuccessDataResult<AccessToken>(accessToken, Messages.SuccessfulLogin);
                }
                catch (Exception e)
                {
                    return new ErrorDataResult<AccessToken>(e.Message);
                }
            }
        }
    }
}
