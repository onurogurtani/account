using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using TurkcellDigitalSchool.Account.Business.Constants;
using TurkcellDigitalSchool.Account.Business.Handlers.Authorizations.ValidationRules;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Core.Aspects.Autofac.Logging;
using TurkcellDigitalSchool.Core.Aspects.Autofac.Validation;
using TurkcellDigitalSchool.Core.CrossCuttingConcerns.Logging.Serilog.Loggers;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Extensions;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Core.Utilities.Toolkit;
using TurkcellDigitalSchool.Entities.Concrete.Core;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Authorizations.Queries
{
    public class LoginFailReSendOtpSmsQuery : IRequest<IDataResult<string>>
    {
        public long MobileLoginId { get; set; }

        public class LoginFailReSendOtpSmsQueryHandler : IRequestHandler<LoginFailReSendOtpSmsQuery, IDataResult<string>>
        {
            private readonly IUserRepository _userRepository;
            private readonly IMobileLoginRepository _mobileLoginRepository;
            private readonly ISmsOtpRepository _smsOtpRepository;
            private readonly string _environment;
            public LoginFailReSendOtpSmsQueryHandler(IUserRepository userRepository, IMobileLoginRepository mobileLoginRepository, ISmsOtpRepository smsOtpRepository)
            {
                _userRepository = userRepository;
                _mobileLoginRepository = mobileLoginRepository;
                _smsOtpRepository = smsOtpRepository;
                _environment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");
            }


            [LogAspect(typeof(FileLogger))]
            [ValidationAspect(typeof(ReSendOtpSmsValidator))]
            public async Task<IDataResult<string>> Handle(LoginFailReSendOtpSmsQuery request, CancellationToken cancellationToken)
            {
                MobileLogin mobileLogin = await _mobileLoginRepository.GetAsync(w => w.Id == request.MobileLoginId);

                var query = _userRepository.Query().Where(u => u.Id == mobileLogin.UserId);

                var user = query.FirstOrDefault();
                if (user == null)
                {
                    return new ErrorDataResult<string>(Messages.UserNotFound);
                }

                try
                {
                    mobileLogin = await ReSendOtpSms(request.MobileLoginId, AuthenticationProviderType.Person, user.MobilePhones.MaskPhoneNumber(), user.Id);
                }
                catch (Exception e)
                {
                    return new ErrorDataResult<string>(e.Message);
                }

                return new SuccessDataResult<string>(mobileLogin.Code.ToString(),Messages.SendMobileCodeSuccessfully); 
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
                    if (_environment == ApplicationMode.DEV.ToString() || _environment == ApplicationMode.DEVTURKCELL.ToString())
                        otp = 123456;

                    if (_environment == ApplicationMode.PROD.ToString())
                    {
                        await _smsOtpRepository.ExecInsertSpForSms(cellPhone, userId, otp.ToString());
                    }

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
