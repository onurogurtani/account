using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading;
using System.Threading.Tasks;
using TurkcellDigitalSchool.Account.Business.Helpers;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Account.Domain.Dtos;
using TurkcellDigitalSchool.Core.Common.Constants;
 
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.Mail;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Core.Utilities.Security.Hashing;
using TurkcellDigitalSchool.Core.Utilities.Toolkit;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Authorizations.Commands
{
    [LogScope]
    [TransactionScope]
    public class UnverifiedUserCommand : IRequest<IDataResult<UnverifiedUserDto>> , IUnLogable
    {
        public UserType UserTypeId { get; set; }
        public string Name { get; set; }
        public string SurName { get; set; }
        public string Email { get; set; }
        public string MobilePhones { get; set; }
        public string Password { get; set; }

        public class UnverifiedUserCommandHandler : IRequestHandler<UnverifiedUserCommand, IDataResult<UnverifiedUserDto>>
        {
            private readonly IUnverifiedUserRepository _unverifiedUserRepository;
            private readonly IUserRepository _userRepository;
            private readonly ISmsOtpRepository _smsOtpRepository;
            private readonly IMailService _mailService;

            public UnverifiedUserCommandHandler(IUnverifiedUserRepository unverifiedUserRepository, IUserRepository userRepository, IMailService mailService, ISmsOtpRepository smsOtpRepository)
            {
                _unverifiedUserRepository = unverifiedUserRepository;
                _userRepository = userRepository;
                _mailService = mailService;
                _smsOtpRepository = smsOtpRepository;
            }

            /// <summary>
            /// Will be reedited
            /// </summary> 

            public async Task<IDataResult<UnverifiedUserDto>> Handle(UnverifiedUserCommand request, CancellationToken cancellationToken)
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

                var unverifiedExistEmail = await _unverifiedUserRepository.Query().AnyAsync(x => x.Email.Trim().ToLower() == request.Email.Trim().ToLower());
                if (unverifiedExistEmail)
                {
                    var entity= _unverifiedUserRepository.Get(x => x.Email.Trim().ToLower() == request.Email.Trim().ToLower());
                    if (entity != null)
                        _unverifiedUserRepository.Delete(entity);

                }

                var unverifiedExistMobilePhone = await _unverifiedUserRepository.Query().AnyAsync(x => x.Email.Trim().ToLower() == request.Email.Trim().ToLower());
                if (unverifiedExistMobilePhone)
                {
                    var entity = _unverifiedUserRepository.Get(x => x.MobilePhones.Trim() == request.Email.Trim());
                    if (entity != null)
                        _unverifiedUserRepository.Delete(entity);
                }

                var unverifiedUser = new UnverifiedUser
                {
                    UserTypeId = request.UserTypeId,
                    Name = request.Name,
                    SurName = request.SurName,
                    Email = request.Email,
                    MobilePhones = request.MobilePhones,
                    PasswordHash = passwordHash,
                    PasswordSalt = passwordSalt,
                    VerificationKeyLastTime = DateTime.UtcNow.AddSeconds(90),
                    VerificationKey = RandomPassword.RandomNumberGenerator().ToString()
                };

                if (unverifiedUser.UserTypeId == UserType.Student)
                {
                    var content = $" Üyelik doğrulama kodu: {unverifiedUser.VerificationKey} ";

                    _mailService.Send(new EmailMessage
                    {
                        Subject = "Üyelik Doğrulama",
                        ToAddresses = new System.Collections.Generic.List<EmailAddress> { new EmailAddress { Address = unverifiedUser.Email } },
                        Content = content
                    });
                }
                else
                {
                    MobileLogin mobileLogin;
                    try
                    {
                        var content = $" Üyelik doğrulama kodu: {unverifiedUser.VerificationKey} ";
                         await _smsOtpRepository.Send(unverifiedUser.MobilePhones, content);
                    }
                    catch (Exception e)
                    {
                        return new ErrorDataResult<UnverifiedUserDto>(e.Message);
                    }
                }

                _unverifiedUserRepository.Add(unverifiedUser);
                await _unverifiedUserRepository.SaveChangesAsync();
                UnverifiedUserDto unverifiedUserDto = new UnverifiedUserDto
                {
                    Id = unverifiedUser.Id,
                    VerificationKey = unverifiedUser.VerificationKey,
                };
                return new SuccessDataResult<UnverifiedUserDto>(unverifiedUserDto);

            }

        }
    }
}