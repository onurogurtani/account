using MediatR;
using System.Threading;
using System.Threading.Tasks;
using TurkcellDigitalSchool.Account.Business.Services.Otp;
using TurkcellDigitalSchool.Account.Business.Services.User;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Enums.OTP;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Common.Constants;
using TurkcellDigitalSchool.Core.Common.Helpers;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.CustomAttribute;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Core.Utilities.Security.Jwt;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Student.Commands
{
    [LogScope] 
    public class UpdateStudentEmailCommand : IRequest<IResult>
    {
        public string Email { get; set; }

        [MessageClassAttr("Öğrenci Profil Email Bilgisi Ekleme/Güncelleme")]
        public class UpdateStudentEmailCommandHandler : IRequestHandler<UpdateStudentEmailCommand, IResult>
        {
            private readonly IUserRepository _userRepository;
            private readonly IUserService _userService;
            private readonly ITokenHelper _tokenHelper;
            private readonly IOtpService _otpService;

            public UpdateStudentEmailCommandHandler(IUserRepository userRepository, IUserService userService, ITokenHelper tokenHelper, IOtpService otpService)
            {
                _userRepository = userRepository;
                _userService = userService;
                _tokenHelper = tokenHelper;
                _otpService = otpService;
            }

            [MessageConstAttr(MessageCodeType.Information)]
            private static string SuccessfulOperation = Messages.SuccessfulOperation;
            [MessageConstAttr(MessageCodeType.Error)]
            private static string EmailAlreadyExist = Messages.EmailAlreadyExist;
            [MessageConstAttr(MessageCodeType.Error)]
            private static string RecordDoesNotExist = Messages.RecordDoesNotExist;
            [MessageConstAttr(MessageCodeType.Error)]
            private static string EnterDifferentEmail = Constants.Messages.EnterDifferentEmail;
            public async Task<IResult> Handle(UpdateStudentEmailCommand request, CancellationToken cancellationToken)
            {
                var userId = _tokenHelper.GetUserIdByCurrentToken();
                var getUser = _userService.GetUserById(userId);

                if (getUser == null)
                    return new ErrorResult(RecordDoesNotExist.PrepareRedisMessage());
                if (getUser.Email == request.Email)
                    return new ErrorResult(EnterDifferentEmail.PrepareRedisMessage());
                if (_userService.IsExistEmail(userId, request.Email))
                    return new ErrorResult(EmailAlreadyExist.PrepareRedisMessage());

                getUser.Email = request.Email;
                getUser.EmailVerify = false;
                await _userRepository.UpdateAndSaveAsync(getUser);

                _otpService.GenerateOtp(userId, ChannelType.Mail, OtpServices.Mail_StudentProfileMailVerify, OTPExpiryDate.NinetySeconds);

                return new SuccessResult(SuccessfulOperation.PrepareRedisMessage());
            }
        }
    }
}
