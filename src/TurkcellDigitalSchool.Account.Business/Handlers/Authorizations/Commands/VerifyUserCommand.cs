using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Common.Constants;
using TurkcellDigitalSchool.Core.Aspects.Autofac.Caching;
using TurkcellDigitalSchool.Core.Aspects.Autofac.Logging;
using TurkcellDigitalSchool.Core.CrossCuttingConcerns.Logging.Serilog.Loggers;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.Results;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Authorizations.Commands
{
    public class VerifyUserCommand : IRequest<IResult>
    {
        public int Id { get; set; }
        public int VerificationKey { get; set; }
        public class VerifyUserCommandHandler : IRequestHandler<VerifyUserCommand, IResult>
        {
            private readonly IUserRepository _userRepository;
            private readonly IUnverifiedUserRepository _unverifiedUserRepository;

            public VerifyUserCommandHandler(IUserRepository userRepository,IUnverifiedUserRepository unverifiedUserRepository)
            {
                _userRepository = userRepository;
                _unverifiedUserRepository = unverifiedUserRepository;
            }

            /// <summary>
            /// Will be reedited
            /// </summary> 
            [CacheRemoveAspect("Get")]
            [LogAspect(typeof(FileLogger))] 
            public async Task<IResult> Handle(VerifyUserCommand request, CancellationToken cancellationToken)
            { 
                var unverifiedUser = _unverifiedUserRepository.Get(x=>x.Id == request.Id);
                if (unverifiedUser == null)
                {
                    return new ErrorResult(Messages.UserNotFound);
                }
                if (unverifiedUser.VerificationKey != request.VerificationKey.ToString())
                {
                    return new ErrorResult(Messages.InvalidOtp);
                }
                if (unverifiedUser.VerificationKeyLastTime < DateTime.Now)
                {
                    return new ErrorResult(Messages.OtpTimeOut);
                }

                var citizenId = (unverifiedUser.CitizenId == 0 ? (long?)null : unverifiedUser.CitizenId);
                var user = new User
                {
                    UserType = unverifiedUser.UserTypeId,
                    CitizenId = citizenId,
                    Name = unverifiedUser.Name,
                    SurName = unverifiedUser.SurName,
                    Email = unverifiedUser.Email,
                    MobilePhones = unverifiedUser.MobilePhones,
                    PasswordHash = unverifiedUser.PasswordHash,
                    PasswordSalt = unverifiedUser.PasswordSalt,
                    RegisterStatus = RegisterStatus.Registered,
                    Status = true
                    
                };

                if (unverifiedUser.UserTypeId == UserType.Parent)
                {
                    user.MobilePhonesVerify = true;
                }
                if (unverifiedUser.UserTypeId == UserType.Student)
                {
                    user.EmailVerify = true;
                }

                try
                {
                    _userRepository.Add(user);
                    await _userRepository.SaveChangesAsync();

                    _unverifiedUserRepository.Delete(unverifiedUser);
                    await _unverifiedUserRepository.SaveChangesAsync();
                }
                catch (Exception)
                {

                    return new ErrorResult(Messages.TryAgain);
                }
                
                return new SuccessResult(Messages.SuccessfulUserVerify);
            }
        }
    }
}