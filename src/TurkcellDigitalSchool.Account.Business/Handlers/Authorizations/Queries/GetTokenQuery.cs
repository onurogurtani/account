using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using TurkcellDigitalSchool.Account.Business.Constants; 
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Common.BusinessAspects;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Utilities.Results; 
using TurkcellDigitalSchool.Integration.IntegrationServices.IdentityServerServices;
using TurkcellDigitalSchool.Integration.IntegrationServices.IdentityServerServices.Model.Request;
using TurkcellDigitalSchool.Integration.IntegrationServices.IdentityServerServices.Model.Response;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Authorizations.Queries
{
    [LogScope]
    public class GetTokenQuery : IRequest<DataResult<TokenIntegraitonResponse>>   
    {
        public string ClientId { get; set; }
        public string Password { get; set; }
        public long UserId { get; set; }

        public class GetTokenQueryHandler : IRequestHandler<GetTokenQuery, DataResult<TokenIntegraitonResponse>>
        {
            private readonly IUserRepository _userRepository;
            private readonly IIDentityServerServices _identityServerServices;

            public GetTokenQueryHandler(IUserRepository userRepository, IIDentityServerServices identityServerServices)
            {
                _userRepository = userRepository;  
                _identityServerServices = identityServerServices;
            }

            /// <summary>
            /// Login instead of user
            /// When the user says the support team can see my data, the administrator can log into the user account.
            /// It is taken from the ViewMyData field in the user table.
            /// If true, the token is created.
            /// </summary>
            
            [SecuredOperation]
            public async Task<DataResult<TokenIntegraitonResponse>> Handle(GetTokenQuery request, CancellationToken cancellationToken)
            {
             
                var  user  = await _userRepository.GetAsync(w => w.Status && w.Id== request.UserId && !w.IsDeleted  );

                if (user == null)
                {
                    return new ErrorDataResult<TokenIntegraitonResponse>(Messages.UserNotFound);
                }

                var userName = (user.CitizenId != 0 && user.CitizenId.ToString().Length == 11)
                    ? user.CitizenId.ToString()
                    : user.Email;

                
               var tokenResponse=  await _identityServerServices.GetToken(new TokenIntegrationRequest
                {
                    client_id = request.ClientId,
                    password = request.Password,
                    username = userName,
                    grant_type = "password"
                },Guid.NewGuid().ToString());

                return new SuccessDataResult<TokenIntegraitonResponse>(tokenResponse, Messages.SuccessfulLogin);
            }
        }
    }
}
