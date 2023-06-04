using System.Threading;
using System.Threading.Tasks;
using MediatR;
using TurkcellDigitalSchool.Account.Business.Services.Authentication;
using TurkcellDigitalSchool.Account.Business.Services.Authentication.Model;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Utilities.Results;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Authorizations.Queries
{
    [LogScope]
    public class LoginUserHandler : IRequestHandler<LoginUserCommand, DataResult<LoginUserResult>>
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
     
        public async Task<DataResult<LoginUserResult>> Handle(LoginUserCommand request, CancellationToken cancellationToken)
        {
            var provider = _coordinator.SelectProvider(request.Provider);
            return new SuccessDataResult<LoginUserResult>(await provider.Login(request));
        }
    }
}
