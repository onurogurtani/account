using System.Security.Claims;
using Duende.IdentityServer.Models;
using Duende.IdentityServer.Validation;
using IdentityModel;
using Org.BouncyCastle.Asn1.Ocsp;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Core.Constants.IdentityServer;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Core.Utilities.Security.Captcha;
using TurkcellDigitalSchool.Core.Utilities.Security.Jwt;
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
        private readonly ICaptchaManager _captchaManager;


        public ResourceOwnerPasswordValidator(ICustomUserSvc customUserSvc, IHttpContextAccessor httpContextAccessor,
            IUserSessionRepository userSessionRepository)
        {
            _customUserSvc = customUserSvc;
            _httpContextAccessor = httpContextAccessor;
            _userSessionRepository = userSessionRepository;
        }
        public async Task ValidateAsync(ResourceOwnerPasswordValidationContext context)
        {

            var csrf_token = _httpContextAccessor.HttpContext.Request.Headers["CSRFTOKEN"].ToString();

            if (string.IsNullOrEmpty(csrf_token))
            {
                context.Result = new GrantValidationResult(TokenRequestErrors.InvalidRequest,
                    Messages.InvalitToken);
                return;
            }

            var errorCount = await _customUserSvc.GetCsrfTokenFailLoginCount(csrf_token);

            if (errorCount > 3 && errorCount <= 5)
            {
                var captchaKey = _httpContextAccessor.HttpContext.Request.Headers["captchaKey"].ToString();

                if (string.IsNullOrEmpty(captchaKey))
                {
                    context.Result = new GrantValidationResult(TokenRequestErrors.InvalidRequest,
                        Messages.captchaKeyIsNotValid);
                    return;
                }

                string environment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");

                if (environment != ApplicationMode.PROD.ToString() && captchaKey == "kg")
                {
                    if (!_captchaManager.Validate(captchaKey))
                    {
                        context.Result = new GrantValidationResult(TokenRequestErrors.InvalidRequest,
                           Messages.captchaKeyIsNotValid);
                        return;
                    }
                } 
            }
             
            var result = await _customUserSvc.Validate(context.UserName, context.Password);

            if (errorCount >= 4 && !result)
            {

            }


            if (!result)
            {
                var failLoginCount = await _customUserSvc.IncCsrfTokenFailLoginCount(csrf_token);

                var customResponse = new Dictionary<string, object>();
                customResponse.Add("IsCapthcaShow", failLoginCount >= 3 && failLoginCount < 5);
                customResponse.Add("IsSendOtp", failLoginCount >= 5);
                context.Result = new GrantValidationResult(TokenRequestErrors.InvalidRequest,
                    Messages.PassError + " " + Messages.LoginFail, customResponse);
                return;
            }

            var user = await _customUserSvc.FindByUserName(context.UserName);






            if ((user.FailLoginCount ?? 0) > 0)
            {
                await _customUserSvc.ResetUserFailLoginCount(user.Id);
            }


            var ip = _httpContextAccessor.HttpContext.Connection.RemoteIpAddress.ToString();
            var session = new UserSession()
            {
                UserId = user.Id,
                NotBefore = 1,
                SessionType = context.Request.Client.ClientId == IdentityServerConst.CLIENT_DIDE_WEB ? SessionType.Web :
                    context.Request.Client.ClientId == IdentityServerConst.CLIENT_DIDE_MOBILE ? SessionType.Mobile : SessionType.None,
                StartTime = DateTime.Now,
                IpAdress = ip
            };
            if (session.SessionType == SessionType.None)
            {
                context.Result = new GrantValidationResult(TokenRequestErrors.InvalidRequest,
                   string.Format(Messages.ClientTanimliDegil, context.Request.Client.ClientId));
                return;
            }

            var addedSession = _userSessionRepository.AddUserSession(session);


            context.Result = new GrantValidationResult(user.Id.ToString(), OidcConstants.AuthenticationMethods.Password, new List<Claim>
            {
                new Claim("SessionType",session.SessionType.ToString()),
                new Claim("SessionId",addedSession.Id.ToString())
            });
        }
    }
}
