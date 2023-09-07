using MediatR;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using TurkcellDigitalSchool.Account.Business.Services.Otp;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Account.Domain.Dtos;
using TurkcellDigitalSchool.Account.Domain.Enums.OTP;
using TurkcellDigitalSchool.Core.Behaviors.Abstraction;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.Results;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Authorizations.Commands
{
    public class VisitorRegisterCommand : IRequest<IDataResult<VisitorRegisterDto>>, IUnLogable
    {
        public string Name { get; set; }
        public string SurName { get; set; }
        public string Email { get; set; }
        public string MobilePhones { get; set; }

        public class VisitorRegisterCommandHandler : IRequestHandler<VisitorRegisterCommand, IDataResult<VisitorRegisterDto>>
        {
            private readonly IVisitorRegisterRepository _visitorRegisterRepository;
            private readonly IOtpService _otpService;
            private readonly IUserRepository _userRepository;
            public VisitorRegisterCommandHandler(IVisitorRegisterRepository visitorRegisterRepository, IOtpService otpService, IUserRepository userRepository)
            {
                _visitorRegisterRepository = visitorRegisterRepository;
                _otpService = otpService;
                _userRepository = userRepository;
            }

            public async Task<IDataResult<VisitorRegisterDto>> Handle(VisitorRegisterCommand request, CancellationToken cancellationToken)
            {

                var name = request.Name.Trim();
                var surName = request.SurName.Trim();
                var email = request.Email.Trim();
                var mobilPhone = request.MobilePhones.Trim();

                var userQuery = _userRepository.Query();

                if (userQuery.Any(w => w.Email == email))
                {
                    return new ErrorDataResult<VisitorRegisterDto>
                    {
                        Message = "Sistemde bu Mail adresi kayıtlıdır."
                    };
                }

                if (userQuery.Any(w => w.MobilePhones == mobilPhone))
                {
                    return new ErrorDataResult<VisitorRegisterDto>
                    {
                        Message = "Sistemde bu Telefon kayıtlıdır."
                    };
                }


                var otpServiceResult = await _otpService.GenerateOtpVisitorRegister(name, surName, email, mobilPhone, OTPExpiryDate.OneHundredTwentySeconds);

                if (!otpServiceResult.Success)
                {
                    return new ErrorDataResult<VisitorRegisterDto>
                    {
                        Message = otpServiceResult.Message
                    };
                }

                var visitorRegisterRecord = new VisitorRegister
                {
                    Name = request.Name.Trim(),
                    SurName = request.SurName.Trim(),
                    Email = request.Email.Trim(),
                    MobilePhones = request.MobilePhones.Trim(),
                    SessionCode = Guid.NewGuid(),
                    ExpiryDate = DateTime.Now.AddSeconds((int)OTPExpiryDate.OneHundredTwentySeconds),
                    SmsOtpCode = otpServiceResult.Data.SmsOtpCode,
                    MailOtpCode = otpServiceResult.Data.MailOtpCode,
                    IsCompleted = false,
                };

                var visitorRegister = _visitorRegisterRepository.CreateAndSave(visitorRegisterRecord);

                return new SuccessDataResult<VisitorRegisterDto>(new VisitorRegisterDto
                {
                    SessionCode = visitorRegister.SessionCode
                });
            }

        }
    }
}
