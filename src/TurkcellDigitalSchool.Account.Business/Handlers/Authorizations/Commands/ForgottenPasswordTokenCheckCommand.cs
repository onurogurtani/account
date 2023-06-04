using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.Extensions.Configuration;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Constants.IdentityServer;
using TurkcellDigitalSchool.Core.Extensions;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Core.Utilities.Security.Jwt;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Authorizations.Commands
{
    [LogScope]
    public class ForgottenPasswordTokenCheckCommand : IRequest<DataResult<UserSession>>
    {
        public string Token { get; set; }

        public class ForgottenPasswordTokenCheckCommandHandler : IRequestHandler<ForgottenPasswordTokenCheckCommand, DataResult<UserSession>>
        {
            private readonly IUserRepository _userRepository;
            private readonly IConfiguration _configuration;
            private readonly IUserSessionRepository _userSessionRepository;
            private readonly ITokenHelper _tokenHelper;

            public ForgottenPasswordTokenCheckCommandHandler(IUserRepository userRepository, ITokenHelper tokenHelper, IUserSessionRepository userSessionRepository)
            {
                _userRepository = userRepository;
                _tokenHelper = tokenHelper;
                _userSessionRepository = userSessionRepository;
            }


        
            public async Task<DataResult<UserSession>> Handle(ForgottenPasswordTokenCheckCommand request, CancellationToken cancellationToken)
            {
                UserSession userSession = new();
                string token = "";
                long userId = 0;

                try
                {
                    token = _tokenHelper.DecodeToken(request.Token);

                    if (DateTimeOffset.FromUnixTimeSeconds(long.Parse(token.Split("}.")[1].ToJObject()["exp"].ToString())).DateTime < DateTime.UtcNow)
                    {
                        return new ErrorDataResult<UserSession>("İşlem Geçersiz.");
                    }

                    var sessionId = long.Parse(token.Split("}.")[1].ToJObject()[IdentityServerConst.IDENTITY_RESOURCE_SESSION_ID].ToString());

                    userId = Int64.Parse(token.Split('"')[11]);

                    userSession = await _userSessionRepository.GetAsync(w => w.User.Id == userId && w.Id== sessionId);

                    if (userSession != null && DateTimeOffset.FromUnixTimeSeconds(long.Parse(token.Split("}.")[1].ToJObject()["nbf"].ToString())).DateTime != userSession.LastTokenDate.ToUniversalTime())
                    {
                        return new ErrorDataResult<UserSession>("İşlem Geçersiz.");
                    }
                }
                catch
                {
                    return new ErrorDataResult<UserSession>("İşlem Geçersiz.");
                }

                userSession.User = await _userRepository.GetAsync(u => u.Id == userId && u.Status);

                if (userSession.User == null)
                {
                    return new ErrorDataResult<UserSession>("Geçersiz İşlem");
                } 
                return new SuccessDataResult<UserSession>(userSession); 
            } 
        }

    }

}

