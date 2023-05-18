using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using TurkcellDigitalSchool.Account.Business.Services.Otp;
using TurkcellDigitalSchool.Account.Domain.Enums.OTP;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Core.Utilities.Security.Jwt;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Otp.Commands
{
    public class GenerateOtpCommand : IRequest<IResult>
    {
        public ChannelType ChanellTypeId { get; set; }
        public OtpServices ServiceId { get; set; }
        public OTPExpiryDate OTPExpiryDate { get; set; }

        public class GenerateOtpCommandHandler : IRequestHandler<GenerateOtpCommand, IResult>
        {
            private readonly IOtpService _otpService;
            private readonly ITokenHelper _tokenHelper;
            public GenerateOtpCommandHandler(IOtpService otpService, ITokenHelper tokenHelper)
            {
                _otpService = otpService;
                _tokenHelper = tokenHelper;
            }
            public async Task<IResult> Handle(GenerateOtpCommand request, CancellationToken cancellationToken)
            {
                var userId = _tokenHelper.GetUserIdByCurrentToken();
                var otpCode = _otpService.GenerateOtp(userId, request.ChanellTypeId, request.ServiceId,request.OTPExpiryDate);
                //todo burası prod öncesi düzeltilecektir.(sms, bip vs.) clinet da cevap dönmeyecektir.
                return new SuccessDataResult<int>(otpCode.Data,otpCode.Message);
            }

        }
    }
}
