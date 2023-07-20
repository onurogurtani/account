using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using TurkcellDigitalSchool.Account.Business.Constants;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Core.AuthorityManagement;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Common.Helpers;
using TurkcellDigitalSchool.Core.Constants.IdentityServer;
using TurkcellDigitalSchool.Core.CustomAttribute; 
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Integration.IntegrationServices.IdentityServerServices;
using TurkcellDigitalSchool.Core.Integration.IntegrationServices.IdentityServerServices.Model.Request;
using TurkcellDigitalSchool.Core.Integration.IntegrationServices.IdentityServerServices.Model.Response;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Core.Utilities.Security.Jwt;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Authorizations.Queries
{
    [LogScope]
    [SecuredOperationScope(ClaimNames = new[] { ClaimConst.IndividualMemberListLoginTo })]
    public class BehalfOfLoginQuery : IRequest<DataResult<TokenIntegraitonResponse>>, ITokenRequest
    {
        public long UserId { get; set; }
        public SessionType SessionType { get; set; }


        [MessageClassAttr("Yerine Login Olma")]
        public class BehalfOfLoginQueryHandler : IRequestHandler<BehalfOfLoginQuery, DataResult<TokenIntegraitonResponse>>
        {
            private readonly IUserRepository _userRepository;
            private readonly IUserSupportTeamViewMyDataRepository _userSupportTeamViewMyDataRepository;
            private readonly ITokenHelper _tokenHelper;

            private readonly IIDentityServerServices _identityServerServices;

            public BehalfOfLoginQueryHandler(IUserRepository userRepository, IIDentityServerServices identityServerServices, ITokenHelper tokenHelper, IUserSupportTeamViewMyDataRepository userSupportTeamViewMyDataRepository)
            {
                _userRepository = userRepository;
                _identityServerServices = identityServerServices;
                _tokenHelper = tokenHelper;
                _userSupportTeamViewMyDataRepository = userSupportTeamViewMyDataRepository;
            }

            [MessageConstAttr(MessageCodeType.Warning)]
            private static string UserNotFound = Messages.UserNotFound;

            [MessageConstAttr(MessageCodeType.Warning)]
            private static string BadSessionType = Messages.BadSessionType;

            /// <summary>
            /// Login instead of user
            /// When the user says the support team can see my data, the administrator can log into the user account.
            /// It is taken from the ViewMyData field in the user table.
            /// If true, the token is created.
            /// </summary>  
            public async Task<DataResult<TokenIntegraitonResponse>> Handle(BehalfOfLoginQuery request, CancellationToken cancellationToken)
            {
                var beforeMonth = DateTime.Now.AddMonths(-1);
                var before15Min = DateTime.Now.AddMinutes(-15);

                var isUserHasSupport= _userSupportTeamViewMyDataRepository.Query().Any(w => (w.UserId == request.UserId && !w.IsDeleted) &&
                                                                      ((w.IsAlways ?? false) ||
                                                                       ((w.IsOneMonth ?? false) &&
                                                                        (w.UpdateTime ?? w.InsertTime) >=
                                                                        beforeMonth) ||
                                                                       ((w.IsFifteenMinutes ?? false) &&
                                                                        (w.UpdateTime ?? w.InsertTime) >= before15Min)
                                                                      ));

                var targetUser = await _userRepository.GetAsync(u => !u.IsDeleted && u.Status  && (u.Id == request.UserId));
              
                if (targetUser == null || !isUserHasSupport)
                {
                    return new ErrorDataResult<TokenIntegraitonResponse>(UserNotFound.PrepareRedisMessage());
                }

                if (request.SessionType == SessionType.None)
                {
                    return new ErrorDataResult<TokenIntegraitonResponse>(BadSessionType.PrepareRedisMessage());
                }

                var clientId = request.SessionType == SessionType.Mobile
                    ? IdentityServerConst.CLIENT_DIDE_MOBILE
                    : IdentityServerConst.CLIENT_DIDE_WEB;

                targetUser.BehalfOfLoginKey = Guid.NewGuid().ToString();

                await _userRepository.SaveChangesAsync();

                var tokenResponse = await _identityServerServices.BehalfOfLogin(new TokenIntegrationRequest
                {
                    client_id = clientId,
                    password = "X",
                    username = "X",
                    grant_type = "password"
                }, targetUser.BehalfOfLoginKey, _tokenHelper.GetUserIdByCurrentToken().ToString());

                return new SuccessDataResult<TokenIntegraitonResponse>(tokenResponse, Messages.SuccessfulLogin.PrepareRedisMessage());
            }
        }
    }
}
