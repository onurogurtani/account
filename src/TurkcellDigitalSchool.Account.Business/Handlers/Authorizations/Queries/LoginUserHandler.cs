using System.Threading;
using System.Threading.Tasks;
using MediatR;
using TurkcellDigitalSchool.Account.Business.Handlers.Authorizations.ValidationRules;
using TurkcellDigitalSchool.Account.Business.Services.Authentication;
using TurkcellDigitalSchool.Account.Business.Services.Authentication.Model;
using TurkcellDigitalSchool.Core.Aspects.Autofac.Logging;
using TurkcellDigitalSchool.Core.Aspects.Autofac.Validation;
using TurkcellDigitalSchool.Core.CrossCuttingConcerns.Logging.Serilog.Loggers;
using TurkcellDigitalSchool.Core.Utilities.Results;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Authorizations.Queries
{
    public class LoginUserHandler : IRequestHandler<LoginUserCommand, IDataResult<LoginUserResult>>
    {
        private readonly IAuthenticationCoordinator _coordinator;

        public LoginUserHandler(IAuthenticationCoordinator coordinator)
        {
            _coordinator = coordinator;
        }

        /// <summary>
        /// Allows a user to login to the system, back to the browser returns a token stored in local storage.
        /// </summary>
        /// <param name="request"></param>
        /// <param name="cancellationToken"></param>
        /// <returns></returns> 
        [LogAspect(typeof(FileLogger))]
        public async Task<IDataResult<LoginUserResult>> Handle(LoginUserCommand request, CancellationToken cancellationToken)
        {
            var provider = _coordinator.SelectProvider(request.Provider);
            return new SuccessDataResult<LoginUserResult>(await provider.Login(request));
        }
    }
}
