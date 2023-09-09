using MediatR;
using Microsoft.AspNetCore.Components.Forms;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using TurkcellDigitalSchool.Account.Business.Handlers.Student.Commands;
using TurkcellDigitalSchool.Account.Business.Services.Otp;
using TurkcellDigitalSchool.Account.Domain.Enums.OTP;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Core.Utilities.Security.Jwt;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Otp.Commands
{
    [LogScope] 
    public class PublicVerifyOtpCommand : IRequest<IResult>
    {
        public ChannelType ChanellTypeId { get; set; }
        public OtpServices ServiceId { get; set; }
        public int Code { get; set; }
        public class PublicVerifyOtpCommandHandler : IRequestHandler<PublicVerifyOtpCommand, IResult>
        {
            private readonly IOtpService _otpService;
            private readonly ITokenHelper _tokenHelper;
            public PublicVerifyOtpCommandHandler(IOtpService otpService, ITokenHelper tokenHelper)
            {
                _otpService = otpService;
                _tokenHelper = tokenHelper;
            }
            public async Task<IResult> Handle(PublicVerifyOtpCommand request, CancellationToken cancellationToken)
            {
                var userId = _tokenHelper.GetUserIdByCurrentToken();
                var otpServiceResult = _otpService.VerifyOtp(userId, request.ChanellTypeId, request.ServiceId, request.Code);
                if (!otpServiceResult.Success)
                {
                    return new ErrorResult(otpServiceResult.Message);
                }
                return new SuccessResult(otpServiceResult.Message);
            }

        }
    }
}
