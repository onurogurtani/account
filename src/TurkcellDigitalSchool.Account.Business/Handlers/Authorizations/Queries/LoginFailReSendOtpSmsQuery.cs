using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.IdentityModel.Tokens;
using TurkcellDigitalSchool.Account.Business.Constants;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Extensions;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Core.Utilities.Toolkit;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Authorizations.Queries
{
    [LogScope]
    public class LoginFailReSendOtpSmsQuery : IRequest<IDataResult<LoginFailReSendOtpSmsQuery.LoginFailReSendOtpSmsQueryResponse>>
    {
        public long MobileLoginId { get; set; }
        public string XId { get; set; }

        public class LoginFailReSendOtpSmsQueryHandler : IRequestHandler<LoginFailReSendOtpSmsQuery, IDataResult<LoginFailReSendOtpSmsQueryResponse>>
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
             
            public async Task<IDataResult<LoginFailReSendOtpSmsQueryResponse>> Handle(LoginFailReSendOtpSmsQuery request, CancellationToken cancellationToken)
            {

                MobileLogin mobileLogin = await _mobileLoginRepository.GetAsync(w => w.Id == request.MobileLoginId && w.Status == UsedStatus.Send);

                if (mobileLogin == null)
                {
                    return new ErrorDataResult<LoginFailReSendOtpSmsQueryResponse>(Messages.otpKodeIsUsed);
                }

                try
                {
                    var userId = Convert.ToInt64(Base64UrlEncoder.Decode(request.XId));
                    if (mobileLogin.UserId != userId)
                    {
                        return new ErrorDataResult<LoginFailReSendOtpSmsQueryResponse>(Messages.otpNotThisUser);
                    }
                }
                catch (Exception)
                {
                    return new ErrorDataResult<LoginFailReSendOtpSmsQueryResponse>(Messages.XIdIsNotCorrenctFormat);
                }

                var query = _userRepository.Query().Where(u => u.Id == mobileLogin.UserId);

                var user = query.FirstOrDefault();
                if (user == null)
                {
                    return new ErrorDataResult<LoginFailReSendOtpSmsQueryResponse>(Messages.UserNotFound);
                }

                try
                {
                    mobileLogin = await ReSendOtpSms(mobileLogin, user);
                }
                catch (Exception e)
                {
                    return new ErrorDataResult<LoginFailReSendOtpSmsQueryResponse>(e.Message);
                }

                return new SuccessDataResult<LoginFailReSendOtpSmsQueryResponse>(
                    new LoginFailReSendOtpSmsQueryResponse
                    {
                        MobileLoginId = request.MobileLoginId,
                        OtpCode = mobileLogin.Code,
                        OtpMobilePhone = user.MobilePhones.MaskPhoneNumber()
                    }, Messages.SendMobileCodeSuccessfully);
            }
            private async Task<MobileLogin> ReSendOtpSms(MobileLogin mobileLogin, User user)
            {


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

                    // Eski boş SMS kodu
                    //   await _smsOtpRepository.ExecInsertSpForSms(user.MobilePhones, user.Id, otp.ToString());
                    // SMS servisi
                    await _smsOtpRepository.Send(user.MobilePhones, $"Şifreniz: {otp.ToString()}");
                   


                    mobileLogin.LastSendDate = DateTime.Now;
                    mobileLogin.ReSendCount++;
                    mobileLogin.Code = otp;
                    mobileLogin.CellPhone = user.MobilePhones;

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

        public class LoginFailReSendOtpSmsQueryResponse
        {
            public string OtpMobilePhone { get; set; }
            public long MobileLoginId { get; set; }
            public int OtpCode { get; set; }
        }
    }
}
