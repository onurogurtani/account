using System;
using System.Threading;
using System.Threading.Tasks;
using DotNetCore.CAP;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.Common.Constants;
 
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Extensions;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Core.SubServiceConst;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Authorizations.Commands
{
    [LogScope]
    [TransactionScope]
    public class VerifyUserCommand : IRequest<IResult>
    {
        public int Id { get; set; }
        public int VerificationKey { get; set; }
        public class VerifyUserCommandHandler : IRequestHandler<VerifyUserCommand, IResult>
        {
            private readonly IUserRepository _userRepository;
            private readonly IUnverifiedUserRepository _unverifiedUserRepository;
            private readonly ICapPublisher _capPublisher;

            public VerifyUserCommandHandler(IUserRepository userRepository, IUnverifiedUserRepository unverifiedUserRepository, ICapPublisher capPublisher)
            {
                _userRepository = userRepository;
                _unverifiedUserRepository = unverifiedUserRepository;
                _capPublisher = capPublisher;
            }

            /// <summary>
            /// Will be reedited
            /// </summary> 
              
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
                if (unverifiedUser.VerificationKeyLastTime < DateTime.UtcNow)
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
                    await _capPublisher.PublishAsync(SubServiceConst.VERIFY_USER_REQUEST, new { userId = user.Id }, cancellationToken: cancellationToken);

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