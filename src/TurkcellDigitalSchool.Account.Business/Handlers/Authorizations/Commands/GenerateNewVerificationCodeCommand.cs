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
using TurkcellDigitalSchool.Core.Utilities.Toolkit;
using TurkcellDigitalSchool.Entities.Concrete;
using TurkcellDigitalSchool.Entities.Concrete.Core;
using TurkcellDigitalSchool.Entities.Dtos;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Authorizations.Commands
{
    public class GenerateNewVerificationCodeCommand : IRequest<IResult>
    {
        public int Id { get; set; }
        public class GenereteNewVerificationCodeCommandHandler : IRequestHandler<GenerateNewVerificationCodeCommand, IResult>
        {
            private readonly IUnverifiedUserRepository _unverifiedUserRepository;

            public GenereteNewVerificationCodeCommandHandler(IUnverifiedUserRepository unverifiedUserRepository)
            {
                _unverifiedUserRepository = unverifiedUserRepository;
            }

            /// <summary>
            /// Will be reedited
            /// </summary>
            [ValidationAspect(typeof(RegisterUserValidator), Priority = 2)]
            [CacheRemoveAspect("Get")]
            [LogAspect(typeof(FileLogger))]
            [TransactionScopeAspectAsync]
            public async Task<IResult> Handle(GenerateNewVerificationCodeCommand request, CancellationToken cancellationToken)
            {

                var unverifiedUser = _unverifiedUserRepository.Get(x => x.Id == request.Id);
                if (unverifiedUser == null)
                {
                    return new ErrorResult(Messages.UserNotFound);
                }
                unverifiedUser.VerificationKey = RandomPassword.RandomNumberGenerator().ToString();
                unverifiedUser.VerificationKeyLastTime = DateTime.UtcNow.AddSeconds(90);


                _unverifiedUserRepository.Update(unverifiedUser);
                await _unverifiedUserRepository.SaveChangesAsync();

                return new SuccessDataResult<UnverifiedUserDto>(new UnverifiedUserDto { Id = unverifiedUser.Id, VerificationKey = unverifiedUser.VerificationKey });
            }
        }
    }
}