using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using TurkcellDigitalSchool.Account.Business.Services.Otp;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.DataAccess.Concrete.EntityFramework;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Account.Domain.Dtos;
using TurkcellDigitalSchool.Account.Domain.Enums.OTP;
using TurkcellDigitalSchool.Core.Behaviors.Abstraction;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Utilities.Results;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Authorizations.Commands
{
    [TransactionScope]
    public class VerifyVisitorRegisterCommand : IRequest<IDataResult<VerifyVisitorRegisterDto>>, IUnLogable
    {
        public Guid SessionCode { get; set; }
        public int SmsOtpCode { get; set; }
        public int EmailOtpCode { get; set; }

        public class VerifyVisitorRegisterCommandHandler : IRequestHandler<VerifyVisitorRegisterCommand, IDataResult<VerifyVisitorRegisterDto>>
        {

            private readonly IVisitorRegisterRepository _visitorRegisterRepository;
            private readonly IUserRepository _userRepository;
            public VerifyVisitorRegisterCommandHandler(IVisitorRegisterRepository visitorRegisterRepository, IUserRepository userRepository)
            {
                _visitorRegisterRepository = visitorRegisterRepository;
                _userRepository = userRepository;
            }

            public async Task<IDataResult<VerifyVisitorRegisterDto>> Handle(VerifyVisitorRegisterCommand request, CancellationToken cancellationToken)
            {

                var getVisitorRegister = _visitorRegisterRepository.Query().Where(w => w.IsCompleted == false && w.ExpiryDate > DateTime.Now && w.SessionCode == request.SessionCode).FirstOrDefault();
                if (getVisitorRegister == null)
                {
                    return new ErrorDataResult<VerifyVisitorRegisterDto>("Session kod bulunamadı.");
                }

                if (getVisitorRegister.SmsOtpCode != request.SmsOtpCode)
                {
                    return new ErrorDataResult<VerifyVisitorRegisterDto>("Sms ile gönderilen kod yanlıştır.");

                }

                if (getVisitorRegister.MailOtpCode != request.EmailOtpCode)
                {
                    return new ErrorDataResult<VerifyVisitorRegisterDto>("Mail ile gönderilen kod yanlıştır.");

                }

                getVisitorRegister.ProcessDate = DateTime.Now;
                getVisitorRegister.IsCompleted = true;
                _visitorRegisterRepository.UpdateAndSave(getVisitorRegister);

                var newRecordUser = new User
                {
                    UserType = Core.Enums.UserType.Visitor,
                    Name = getVisitorRegister.Name,
                    SurName = getVisitorRegister.SurName,
                    Email = getVisitorRegister.Email,
                    MobilePhones = getVisitorRegister.MobilePhones,
                };

                _userRepository.Add(newRecordUser);
                await _userRepository.SaveChangesAsync();

                return new SuccessDataResult<VerifyVisitorRegisterDto>(new VerifyVisitorRegisterDto
                {
                    UserId = newRecordUser.Id
                });

            }
        }
    }

}
