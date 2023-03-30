using System.Threading;
using System.Threading.Tasks;
using MediatR;
using TurkcellDigitalSchool.Account.Business.Constants;
using TurkcellDigitalSchool.Core.Aspects.Autofac.Logging;
using TurkcellDigitalSchool.Core.CrossCuttingConcerns.Caching;
using TurkcellDigitalSchool.Core.CrossCuttingConcerns.Logging.Serilog.Loggers;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Core.Utilities.Security.Jwt;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Authorizations.Queries
{
    public class LogoutUserQuery : IRequest<IDataResult<AccessToken>>
    {
        public class LogoutUserQueryHandler : IRequestHandler<LogoutUserQuery, IDataResult<AccessToken>>
        {
            private readonly ITokenHelper _tokenHelper;
            private readonly ICacheManager _cacheManager;

            public LogoutUserQueryHandler(ITokenHelper tokenHelper, ICacheManager cacheManager)
            {
                _tokenHelper = tokenHelper;
                _cacheManager = cacheManager;
            }

      
            [LogAspect(typeof(FileLogger))]
            public async Task<IDataResult<AccessToken>> Handle(LogoutUserQuery request, CancellationToken cancellationToken)
            {
                var userId = await Task.FromResult(_tokenHelper.GetUserIdByCurrentToken());
                _cacheManager.Remove($"{CacheKeys.UserIdForClaim}={userId}");
                return new SuccessDataResult<AccessToken>(
                    new AccessToken { 
                        Token = ""
                    } , Messages.SuccessfulLogOut);
            }

        }
    }
}
