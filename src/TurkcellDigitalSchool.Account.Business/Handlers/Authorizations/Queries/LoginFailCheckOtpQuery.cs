using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using TurkcellDigitalSchool.Account.Business.Constants;
using TurkcellDigitalSchool.Account.Business.Handlers.Authorizations.Commands;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Core.Aspects.Autofac.Logging;
using TurkcellDigitalSchool.Core.Constants.IdentityServer;
using TurkcellDigitalSchool.Core.CrossCuttingConcerns.Logging.Serilog.Loggers;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Entities.Concrete.Core;
using TurkcellDigitalSchool.Entities.Enums;
using static TurkcellDigitalSchool.Account.Business.Handlers.Authorizations.Queries.LoginFailCheckOtpQuery;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Authorizations.Queries
{
    public class LoginFailCheckOtpQuery : IRequest<IDataResult<LoginFailCheckOtpResponse>>
    {
        public long MobileLoginId { get; set; }
        public int Otp { get; set; }
        public SendType PassResetLinkSendingType { get; set; }

        public class LoginFailCheckOtpQueryHandler : IRequestHandler<LoginFailCheckOtpQuery, IDataResult<LoginFailCheckOtpResponse>>
        {
            private readonly IUserRepository _userRepository;
            private readonly IMobileLoginRepository _mobileLoginRepository;
            private readonly IMediator _mediator;

            public LoginFailCheckOtpQueryHandler(IUserRepository userRepository, IMobileLoginRepository mobileLoginRepository,
                IMediator mediator)
            {
                _userRepository = userRepository;
                _mobileLoginRepository = mobileLoginRepository;
                _mediator = mediator;
            }

            [LogAspect(typeof(FileLogger))]
            public async Task<IDataResult<LoginFailCheckOtpResponse>> Handle(LoginFailCheckOtpQuery request, CancellationToken cancellationToken)
            {
                var mobileLogin = await _mobileLoginRepository.GetAsync(m =>
                    m.Provider == AuthenticationProviderType.Person &&
                    m.Id == request.MobileLoginId); //  m.Code == request.Otp &&
                                                    //  m.LastSendDate.AddSeconds(OtpConst.OtpExpSec) > date &&
                                                    //  m.Status == UsedStatus.Send);
                if (mobileLogin == null)
                {
                    return new ErrorDataResult<LoginFailCheckOtpResponse>(Messages.InvalidOtpId);
                }

                var user = await _userRepository.GetAsync(u => u.Id == mobileLogin.UserId && u.Status);

                if (user == null)
                {
                    return new ErrorDataResult<LoginFailCheckOtpResponse>(Messages.NotFountValidUser);
                }

                DateTime date = DateTime.Now;

                if (mobileLogin.LastSendDate.ToUniversalTime().AddSeconds(OtpConst.OtpExpSec) < date)
                {
                    return new ErrorDataResult<LoginFailCheckOtpResponse>(Messages.OtpTimeIsFinished);
                }

                if (mobileLogin.Status != UsedStatus.Send)
                {
                    return new ErrorDataResult<LoginFailCheckOtpResponse>(Messages.otpIsNotReUsed);
                }


                if (mobileLogin.Code != request.Otp)
                {
                    var errorCount = await _userRepository.IncFailLoginOtpCount(mobileLogin.UserId);
                    if (errorCount >= 10)
                    { 
                        var sendPasswordResetLinkResult = await _mediator.Send(new ForgotPasswordSendLinkCommand
                        {
                            SendingType = request.PassResetLinkSendingType,
                            UserId = user.Id
                        }, cancellationToken);

                        if (!sendPasswordResetLinkResult.Success)
                        {
                            return new ErrorDataResult<LoginFailCheckOtpResponse>(sendPasswordResetLinkResult.Message);
                        } 

                        return new SuccessDataResult<LoginFailCheckOtpResponse>(new LoginFailCheckOtpResponse
                        { 
                            PasswordChangeType = PasswordChangeType.CanChangePassFromLink
                        }, sendPasswordResetLinkResult.Message);
                    }
                    return new ErrorDataResult<LoginFailCheckOtpResponse>(Messages.InvalidOtpCode);
                }
                 
                mobileLogin.Status = UsedStatus.Used;
                mobileLogin.UsedDate = date;
                mobileLogin.NewPassGuid = Guid.NewGuid().ToString();
                mobileLogin.NewPassGuidExp = DateTime.Now.AddHours(OtpConst.NewPassLinkExpHour);
                mobileLogin.NewPassStatus = UsedStatus.Send;
                _mobileLoginRepository.Update(mobileLogin); 



                await _mobileLoginRepository.SaveChangesAsync(); 
                await _userRepository.ResetFailLoginOtpCount(mobileLogin.UserId);
                 
                return new SuccessDataResult<LoginFailCheckOtpResponse>(new LoginFailCheckOtpResponse
                {
                    Guid = mobileLogin.NewPassGuid,
                    PasswordChangeType = PasswordChangeType.CanChangePassFromPage
                });
            }
        }
         
        public class LoginFailCheckOtpResponse
        {
            public PasswordChangeType PasswordChangeType { get; set; }
            public string Guid { get; set; } 
        } 
    }
}
