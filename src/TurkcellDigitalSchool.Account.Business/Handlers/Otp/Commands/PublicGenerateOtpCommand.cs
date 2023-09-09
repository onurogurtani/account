using Hangfire.MemoryStorage.Utilities;
using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;
using TurkcellDigitalSchool.Account.Business.Constants;
using TurkcellDigitalSchool.Account.Business.Services.Otp;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Enums.OTP;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Core.Utilities.Security.Jwt;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Otp.Commands
{
    [LogScope]
    public class PublicGenerateOtpCommand : IRequest<IResult>
    {
        public Guid SessionCode { get; set; }
        public ChannelType ChanellTypeId { get; set; }
        public OtpServices ServiceId { get; set; }
        public OTPExpiryDate OTPExpiryDate { get; set; }

        public class PublicGenerateOtpCommandHandler : IRequestHandler<PublicGenerateOtpCommand, IResult>
        {
            private readonly IOtpService _otpService;
            private readonly ITokenHelper _tokenHelper;
            private readonly IUserRepository _userRepository;
            public PublicGenerateOtpCommandHandler(IOtpService otpService, ITokenHelper tokenHelper, IUserRepository userRepository)
            {
                _otpService = otpService;
                _tokenHelper = tokenHelper;
                _userRepository = userRepository;
            }
            public async Task<IResult> Handle(PublicGenerateOtpCommand request, CancellationToken cancellationToken)
            {
                var userId = _tokenHelper.GetUserIdByCurrentToken();
                var otpCode = _otpService.PublicGenerateOtp(request.SessionCode, request.ChanellTypeId, request.ServiceId, request.OTPExpiryDate);
                var user = _userRepository.Get(x => x.Id == userId);
                if (user == null)
                {
                    new ErrorDataResult<string>(Messages.UserNotFound);
                }
                return new SuccessDataResult<string>(otpCode.Message);
            }

        }
    }
}
