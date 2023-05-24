using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TurkcellDigitalSchool.Account.Business.Helpers;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Account.Domain.Dtos;
using TurkcellDigitalSchool.Common.Constants;
using TurkcellDigitalSchool.Core.Aspects.Autofac.Caching;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.Mail;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Core.Utilities.Security.Hashing; 
using TurkcellDigitalSchool.Core.Utilities.Toolkit;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Authorizations.Commands
{
    [LogScope]
    public class UnverifiedUserCommand : IRequest<IDataResult<UnverifiedUserDto>>
    {
        public UserType UserTypeId { get; set; }
        public string Name { get; set; }
        public string SurName { get; set; }
        public string Email { get; set; }
        public string MobilePhones { get; set; }
        public string Password { get; set; }

        public class UnverifiedUserCommandCommandHandler : IRequestHandler<UnverifiedUserCommand, IDataResult<UnverifiedUserDto>>
        {
            private readonly IUnverifiedUserRepository _unverifiedUserRepository;
            private readonly IUserRepository _userRepository;
            private readonly ISendOtpSmsHelper _sendOtpSmsHelper;
            private readonly IMailService _mailService;

            public UnverifiedUserCommandCommandHandler(IUnverifiedUserRepository unverifiedUserRepository, ISendOtpSmsHelper sendOtpSmsHelper, IUserRepository userRepository, IMailService mailService)
            {
                _unverifiedUserRepository = unverifiedUserRepository;
                _sendOtpSmsHelper = sendOtpSmsHelper;
                _userRepository = userRepository;
                _mailService = mailService;
            }

            /// <summary>
            /// Will be reedited
            /// </summary> 
            [CacheRemoveAspect("Get")] 
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
                if (existEmail)
                {
                    var unverifiedUserEmail =  _unverifiedUserRepository.Get(x => x.Email.Trim().ToLower() == request.Email.Trim().ToLower());
                     _unverifiedUserRepository.Delete(new UnverifiedUser { Id= unverifiedUserEmail.Id});
                }

                var unverifiedExistMobilePhone = await _unverifiedUserRepository.Query().AnyAsync(x => x.Email.Trim().ToLower() == request.Email.Trim().ToLower());
                if (existEmail)
                {
                    var unverifiedUserMobilePhone = _unverifiedUserRepository.Get(x => x.MobilePhones.Trim() == request.Email.Trim());
                    _unverifiedUserRepository.Delete(new UnverifiedUser { Id = unverifiedUserMobilePhone.Id });
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

                };


                if (unverifiedUser.UserTypeId == UserType.Student)
                {
                    unverifiedUser.VerificationKey = RandomPassword.RandomNumberGenerator().ToString();
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
                        mobileLogin = await _sendOtpSmsHelper.SendOtpSms(AuthenticationProviderType.Person, unverifiedUser.MobilePhones, unverifiedUser.Id);
                        unverifiedUser.VerificationKey = mobileLogin.Code.ToString();
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