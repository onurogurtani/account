using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TurkcellDigitalSchool.Account.Business.Handlers.Authorizations.ValidationRules;
using TurkcellDigitalSchool.Account.Business.Helpers;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.DataAccess.Concrete.EntityFramework;
using TurkcellDigitalSchool.Common.Constants;
using TurkcellDigitalSchool.Common.Helpers;
using TurkcellDigitalSchool.Core.Aspects.Autofac.Caching;
using TurkcellDigitalSchool.Core.Aspects.Autofac.Logging;
using TurkcellDigitalSchool.Core.Aspects.Autofac.Transaction;
using TurkcellDigitalSchool.Core.Aspects.Autofac.Validation;
using TurkcellDigitalSchool.Core.CrossCuttingConcerns.Logging.Serilog.Loggers;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Core.Utilities.Security.Hashing;
using TurkcellDigitalSchool.Core.Utilities.Security.Jwt;
using TurkcellDigitalSchool.Entities.Concrete;
using TurkcellDigitalSchool.Entities.Concrete.Core;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Authorizations.Commands
{
    public class VerifyUserCommand : IRequest<IDataResult<User>>
    {
        public int Id { get; set; }
        public int VerificationKey { get; set; }
        public class VerifyUserCommandHandler : IRequestHandler<VerifyUserCommand, IDataResult<User>>
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
            [ValidationAspect(typeof(RegisterUserValidator), Priority = 2)]
            [CacheRemoveAspect("Get")]
            [LogAspect(typeof(FileLogger))]
            [TransactionScopeAspectAsync]
            public async Task<IDataResult<User>> Handle(VerifyUserCommand request, CancellationToken cancellationToken)
            {


                var unverifiedUser = _unverifiedUserRepository.Get(x=>x.Id == request.Id);
                if (unverifiedUser == null)
                {
                    return new ErrorDataResult<User>(Messages.UserNotFound);
                }
                if (unverifiedUser.VerificationKey != request.VerificationKey.ToString())
                {
                    return new ErrorDataResult<User>(Messages.InvalidOtp);
                }

                var user = new User
                {
                    UserType = unverifiedUser.UserTypeId,
                    CitizenId = unverifiedUser.CitizenId,
                    Name = unverifiedUser.Name,
                    SurName = unverifiedUser.SurName,
                    Email = unverifiedUser.Email,
                    MobilePhones = unverifiedUser.MobilePhones,
                    PasswordHash = unverifiedUser.PasswordHash,
                    PasswordSalt = unverifiedUser.PasswordSalt
                };

                try
                {
                    _userRepository.Add(user);
                    await _userRepository.SaveChangesAsync();
                    _unverifiedUserRepository.Delete(new UnverifiedUser { Id = request.Id });
                }
                catch (Exception)
                {

                    return new ErrorDataResult<User>(Messages.TryAgain);
                }
                
                return new SuccessDataResult<User>(user, Messages.SuccessfulUserVerify);
            }
        }
    }
}