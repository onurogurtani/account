﻿using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.IdentityModel.Tokens;
using TurkcellDigitalSchool.Account.Business.Constants;
using TurkcellDigitalSchool.Account.Business.Handlers.Authorizations.Queries;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Core.Utilities.Security.Hashing;
using TurkcellDigitalSchool.Core.Integration.IntegrationServices.IdentityServerServices.Model.Response;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Authorizations.Commands
{
    [LogScope]
    public class OldPasswordToNewPasswordCommand : IRequest<DataResult<TokenIntegraitonResponse>>
    {
        public string XId { get; set; }
        public string Guid { get; set; } 
        public string OldPass { get; set; }
        public string NewPass { get; set; }
        public string NewPassAgain { get; set; }
        public string ClientId { get; set; }

        public class OldPasswordToNewPasswordCommandHandler : IRequestHandler<OldPasswordToNewPasswordCommand, DataResult<TokenIntegraitonResponse>>
        {
            private readonly IUserRepository _userRepository;
            private readonly IMediator _mediator;

            public OldPasswordToNewPasswordCommandHandler(IUserRepository userRepository, IMobileLoginRepository mobileLoginRepository, ILoginFailCounterRepository loginFailCounterRepository, IMediator mediator)
            {
                _userRepository = userRepository;
                _mediator = mediator;
            }
             
            public async Task<DataResult<TokenIntegraitonResponse>> Handle(OldPasswordToNewPasswordCommand request, CancellationToken cancellationToken)
            {
                if (request.NewPass != request.NewPassAgain)
                {
                    return new ErrorDataResult<TokenIntegraitonResponse>(Messages.PasswordNotEqual);
                }

                var userId = Convert.ToInt64(Base64UrlEncoder.Decode(request.XId));

                var user = await _userRepository.GetAsync(u => u.Id == userId);


                if (user == null)
                {
                    return new ErrorDataResult<TokenIntegraitonResponse>(Messages.UserNotFound);
                }

             


                if (!(user.LastPasswordChangeGuid == request.Guid 
                    && user.LastPasswordChangeExpTime != null && user.LastPasswordChangeExpTime.Value.ToUniversalTime() > DateTime.Now))
                {
                    return new ErrorDataResult<TokenIntegraitonResponse>(Messages.PasswordChangeTimeFinished);
                }

                var isOldPassCorrect = HashingHelper.VerifyPasswordHash(request.OldPass, user.PasswordSalt, user.PasswordHash);
                 
                if (!isOldPassCorrect)
                {
                    return new ErrorDataResult<TokenIntegraitonResponse>(Messages.oldPassIsNotCorrect);
                }
                 
                HashingHelper.CreatePasswordHash(request.NewPass, out var passwordSalt, out var passwordHash);
                user.PasswordHash = passwordHash;
                user.PasswordSalt = passwordSalt;
                user.FailOtpCount = 0;
                user.LastPasswordDate = DateTime.Now;
                user.LastPasswordChangeExpTime = null;
                user.LastPasswordChangeGuid = null;
                
                await _userRepository.UpdateAndSaveAsync(user);
                 

                var tokenResponse = await _mediator.Send(new GetTokenQuery
                {
                    UserId = user.Id,
                    Password = request.NewPass,
                    ClientId = request.ClientId,
                });

                return new SuccessDataResult<TokenIntegraitonResponse>(tokenResponse.Data, Messages.PasswordChanged);
            }
        }
    }
}
