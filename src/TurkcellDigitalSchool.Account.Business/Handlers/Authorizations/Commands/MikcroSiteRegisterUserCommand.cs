using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading;
using System.Threading.Tasks;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Account.Domain.Dtos;
using TurkcellDigitalSchool.Account.Domain.Enums.OTP;
using TurkcellDigitalSchool.Core.Behaviors.Abstraction;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Common.Constants;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.Mail;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Core.Utilities.Security.Hashing;
using TurkcellDigitalSchool.Core.Utilities.Toolkit;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Authorizations.Commands
{
    [TransactionScope]
    [LogScope]
    public class MikcroSiteRegisterUserCommand : IRequest<IDataResult<UnverifiedUserDto>>, IUnLogable
    {
        public UserType UserTypeId { get; set; }
        public string Name { get; set; }
        public string SurName { get; set; }
        public long CitizenId { get; set; }
        public DateTime BirtDate { get; set; }
        public string MobilePhones { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }

        public class MikcroSiteRegisterUserCommandHandler : IRequestHandler<MikcroSiteRegisterUserCommand, IDataResult<UnverifiedUserDto>>
        {


            private readonly IUsersWaitingVerificationRepository _usersWaitingVerificationRepository;
            private readonly IUserRepository _userRepository;
            private readonly ISmsOtpRepository _smsOtpRepository;
            private readonly IMailService _mailService;

            public MikcroSiteRegisterUserCommandHandler(IUsersWaitingVerificationRepository usersWaitingVerificationRepository, IUserRepository userRepository, IMailService mailService, ISmsOtpRepository smsOtpRepository)
            {
                _usersWaitingVerificationRepository = usersWaitingVerificationRepository;
                _userRepository = userRepository;
                _mailService = mailService;
                _smsOtpRepository = smsOtpRepository;
            }

            /// <summary>
            /// Will be reedited
            /// </summary> 
            public async Task<IDataResult<UnverifiedUserDto>> Handle(MikcroSiteRegisterUserCommand request, CancellationToken cancellationToken)
            {
                HashingHelper.CreatePasswordHash(request.Password, out var passwordSalt, out var passwordHash);

                var existEmail = await _userRepository.Query().AnyAsync(x => x.Email.Trim().ToLower() == request.Email.Trim().ToLower());
                if (existEmail)
                    return new ErrorDataResult<UnverifiedUserDto>(Messages.EmailAlreadyExist);

                if (!string.IsNullOrEmpty(request.MobilePhones))
                {
                    var existPhone = await _userRepository.Query().AnyAsync(x => x.MobilePhones == request.MobilePhones);
                    if (existPhone)
                        return new ErrorDataResult<UnverifiedUserDto>(Messages.MobilePhoneAlreadyExist);
                }

                //var unverifiedExistEmail = await _unverifiedUserRepository.Query().AnyAsync(x => x.Email.Trim().ToLower() == request.Email.Trim().ToLower());
                //if (unverifiedExistEmail)
                //{
                //    var entity = _unverifiedUserRepository.Get(x => x.Email.Trim().ToLower() == request.Email.Trim().ToLower());
                //    if (entity != null)
                //        _unverifiedUserRepository.Delete(entity);
                //}

                //var unverifiedExistMobilePhone = await _unverifiedUserRepository.Query().AnyAsync(x => x.Email.Trim().ToLower() == request.Email.Trim().ToLower());
                //if (unverifiedExistMobilePhone)
                //{
                //    var entity = _unverifiedUserRepository.Get(x => x.MobilePhones.Trim() == request.Email.Trim());
                //    if (entity != null)
                //        _unverifiedUserRepository.Delete(entity);
                //}

                var unverifiedUser = new UsersWaitingVerification
                {
                    UserTypeId = request.UserTypeId,
                    Name = request.Name,
                    SurName = request.SurName,
                    Email = request.Email,
                    MobilePhones = request.MobilePhones,
                    PasswordHash = passwordHash,
                    PasswordSalt = passwordSalt,
                    CitizenId = request.CitizenId,
                    BirthDate = request.BirtDate,
                    SessionCode = Guid.NewGuid(),
                    ExpiryDate = DateTime.Now.AddSeconds((int)OTPExpiryDate.OneHundredTwentySeconds),
                    SmsOtpCode = 1,
                    MailOtpCode = 1,
                    IsCompleted = false,
                };

                //if (unverifiedUser.UserTypeId == UserType.Student)
                //{
                //    var content = $" Üyelik doğrulama kodu: {unverifiedUser.VerificationKey} ";

                //    _mailService.Send(new EmailMessage
                //    {
                //        Subject = "Üyelik Doğrulama",
                //        ToAddresses = new System.Collections.Generic.List<EmailAddress> { new EmailAddress { Address = unverifiedUser.Email } },
                //        Content = content
                //    });
                //}
                //else
                //{
                //    MobileLogin mobileLogin;
                //    try
                //    {
                //        var content = $" Üyelik doğrulama kodu: {unverifiedUser.VerificationKey} ";
                //        await _smsOtpRepository.Send(unverifiedUser.MobilePhones, content);
                //    }
                //    catch (Exception e)
                //    {
                //        return new ErrorDataResult<UnverifiedUserDto>(e.Message);
                //    }
                //}

                _usersWaitingVerificationRepository.Add(unverifiedUser);
                await _usersWaitingVerificationRepository.SaveChangesAsync();
                UnverifiedUserDto unverifiedUserDto = new UnverifiedUserDto
                {
                    Id = unverifiedUser.Id,
                    VerificationKey = "",
                };
                return new SuccessDataResult<UnverifiedUserDto>(unverifiedUserDto);
            }
        }
    }
}