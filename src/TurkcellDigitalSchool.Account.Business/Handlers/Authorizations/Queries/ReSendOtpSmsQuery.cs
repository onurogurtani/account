using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using TurkcellDigitalSchool.Account.Business.Constants;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Common;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.CrossCuttingConcerns.Caching;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Core.Utilities.Security.Jwt;
using TurkcellDigitalSchool.Core.Utilities.Toolkit;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Authorizations.Queries
{
    [LogScope]
    public class ReSendOtpSmsQuery : IRequest<DataResult<AccessToken>>
    {
        public long MobileLoginId { get; set; }
        public bool IsRegister { get; set; }

        public class ReSendSmsQueryHandler : IRequestHandler<ReSendOtpSmsQuery, DataResult<AccessToken>>
        {
            private readonly ConfigurationManager _configurationManager;
            private readonly IUserRepository _userRepository;
            private readonly ITokenHelper _tokenHelper;
            private readonly IMediator _mediator;
            private readonly ICacheManager _cacheManager;
            private readonly IMobileLoginRepository _mobileLoginRepository;
            private readonly ISmsOtpRepository _smsOtpRepository;

            public ReSendSmsQueryHandler(IUserRepository userRepository, ITokenHelper tokenHelper, IMediator mediator, ICacheManager cacheManager, IMobileLoginRepository mobileLoginRepository, ISmsOtpRepository smsOtpRepository, ConfigurationManager configurationManager)
            {
                _userRepository = userRepository;
                _tokenHelper = tokenHelper;
                _mediator = mediator;
                _cacheManager = cacheManager;
                _mobileLoginRepository = mobileLoginRepository;
                _smsOtpRepository = smsOtpRepository;
                _configurationManager = configurationManager;
            }
             
            public async Task<DataResult<AccessToken>> Handle(ReSendOtpSmsQuery request, CancellationToken cancellationToken)
            {
                MobileLogin mobileLogin = await _mobileLoginRepository.GetAsync(w => w.Id == request.MobileLoginId);

                var query = _userRepository.Query().Where(u => u.Id == mobileLogin.UserId);

                if (!request.IsRegister)
                {
                    query = query.Where(u => u.Status);
                }

                var user = query.FirstOrDefault();
                if (user == null)
                {
                    return new ErrorDataResult<AccessToken>(Messages.PassError);
                }

                try
                {
                    mobileLogin = await ReSendOtpSms(request.MobileLoginId, AuthenticationProviderType.Person, user.MobilePhones, user.Id);
                }
                catch (Exception e)
                {
                    return new ErrorDataResult<AccessToken>(e.Message);
                }

                return new SuccessDataResult<AccessToken>(
                    new AccessToken
                    {
                        Claims = new List<string> { mobileLogin.Code.ToString() },
                        Expiration = mobileLogin.LastSendDate.AddSeconds(120)
                    }, Messages.SendMobileCodeSuccessfully);

            }

            private async Task<MobileLogin> ReSendOtpSms(long mobileLoginId, AuthenticationProviderType providerType, string cellPhone, long userId)
            {
                var mobileLogin = await _mobileLoginRepository.GetAsync(
                    m => m.Provider == providerType &&
                    m.UserId == userId &&
                    m.Status == UsedStatus.Send &&
                    m.Id == mobileLoginId
                );

                if (mobileLogin != default)
                {
                    if (mobileLogin.ReSendCount >= 3)
                    {
                        mobileLogin.Status = UsedStatus.Cancelled;
                        _mobileLoginRepository.Update(mobileLogin);
                        await _mobileLoginRepository.SaveChangesAsync();
                        throw new Exception(Messages.UnableToProccess);
                    }
                    int otp = RandomPassword.RandomNumberGenerator();


                    // Eski boş SMS kodu
                    //  await _smsOtpRepository.ExecInsertSpForSms(cellPhone, userId, otp.ToString());
                    // SMS servisi
                    await _smsOtpRepository.Send(cellPhone, $"Şifreniz: {otp.ToString()}");

                    



                    mobileLogin.LastSendDate = DateTime.Now;
                    mobileLogin.ReSendCount++;
                    mobileLogin.Code = otp;
                    _mobileLoginRepository.Update(mobileLogin);
                    await _mobileLoginRepository.SaveChangesAsync();
                }
                else
                {
                    throw new Exception(Messages.UnableToProccess);
                }
                return mobileLogin;
            }
        }
    }
}
