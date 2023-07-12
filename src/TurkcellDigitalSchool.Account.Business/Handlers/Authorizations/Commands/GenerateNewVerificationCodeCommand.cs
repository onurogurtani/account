﻿using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Dtos;
using TurkcellDigitalSchool.Core.Common.Constants;
 
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Core.Utilities.Toolkit;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Authorizations.Commands
{
    [LogScope]
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