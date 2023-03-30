using System.Security.Claims;
using Duende.IdentityServer.Models;
using Duende.IdentityServer.Validation;
using IdentityModel;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Core.Constants.IdentityServer;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.IdentityServerService.Constants;
using TurkcellDigitalSchool.IdentityServerService.Services.Contract;
using UserSession = TurkcellDigitalSchool.Entities.Concrete.Core.UserSession;

namespace TurkcellDigitalSchool.IdentityServerService.Services
{
    public class ResourceOwnerPasswordValidator : IResourceOwnerPasswordValidator
    {
        private readonly ICustomUserSvc _customUserSvc;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IUserSessionRepository _userSessionRepository;
        public ResourceOwnerPasswordValidator(ICustomUserSvc customUserSvc , IHttpContextAccessor httpContextAccessor, IUserSessionRepository userSessionRepository)
        {
            _customUserSvc = customUserSvc;
            _httpContextAccessor= httpContextAccessor;
            _userSessionRepository = userSessionRepository;
        }
        public async Task ValidateAsync(ResourceOwnerPasswordValidationContext context)
        {
            var result = await _customUserSvc.Validate(context.UserName, context.Password);
            var user = await _customUserSvc.FindByUserName(context.UserName);
            if (!result)
            { 
                var failLoginCount = await _customUserSvc.IncUserFailLoginCount(user.Id);
                var customResponse = new Dictionary<string, object>();
                customResponse.Add("IsCapthcaShow", failLoginCount>=3 && failLoginCount <5 );
                customResponse.Add("IsSendOtp",failLoginCount >=5);
                context.Result = new GrantValidationResult(TokenRequestErrors.InvalidRequest,
                    Messages.PassError + " " + string.Format(Messages.FailLoginCount, failLoginCount), customResponse); 
                return;
            }

            if ((user.FailLoginCount ?? 0) > 0)
            {
                await _customUserSvc.ResetUserFailLoginCount(user.Id);  
            }

            
            var ip = _httpContextAccessor.HttpContext.Connection.RemoteIpAddress.ToString();
            var session= new UserSession()
            {
                UserId = user.Id,
                NotBefore = 1,
                SessionType = context.Request.Client.ClientId == IdentityServerConst.CLIENT_DIDE_WEB ? SessionType.Web :
                    context.Request.Client.ClientId == IdentityServerConst.CLIENT_DIDE_MOBILE ? SessionType.Mobile : SessionType.None,
                StartTime = DateTime.Now,
                IpAdress = ip
            };
            if (session.SessionType==SessionType.None)
            {
                context.Result = new GrantValidationResult(TokenRequestErrors.InvalidRequest,
                   string.Format(Messages.ClientTanimliDegil, context.Request.Client.ClientId));
                return;
            } 

            var addedSession = _userSessionRepository.AddUserSession(session);

             
            context.Result = new GrantValidationResult(user.Id.ToString(), OidcConstants.AuthenticationMethods.Password,new List<Claim>
            {
                new Claim("SessionType",session.SessionType.ToString()),
                new Claim("SessionId",addedSession.Id.ToString())
            });
        }
    }
}
