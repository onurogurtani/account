using System.Security.Claims;
using Duende.IdentityServer.Models;
using Duende.IdentityServer.Validation;
using IdentityModel;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Core.Constants.IdentityServer;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Extensions;
using TurkcellDigitalSchool.Core.Utilities.Security.Captcha;
using TurkcellDigitalSchool.Core.Utilities.Toolkit;
using TurkcellDigitalSchool.Entities.Concrete.Core;
using TurkcellDigitalSchool.IdentityServerService.Constants;
using TurkcellDigitalSchool.IdentityServerService.Services.Contract;
using UserSession = TurkcellDigitalSchool.Entities.Concrete.Core.UserSession;

namespace TurkcellDigitalSchool.IdentityServerService.Services
{
    public class ResourceOwnerPasswordValidator : IResourceOwnerPasswordValidator
    {
        private readonly ICustomUserSvc _customUserSvc;
        private readonly ILoginFailCounterRepository _loginFailCounterRepository;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IUserSessionRepository _userSessionRepository;
        private readonly ICaptchaManager _captchaManager;
        private readonly IMobileLoginRepository _mobileLoginRepository;
        private readonly ISmsOtpRepository _smsOtpRepository;
        private readonly string _environment;

        public ResourceOwnerPasswordValidator(ICustomUserSvc customUserSvc, IHttpContextAccessor httpContextAccessor,
            IUserSessionRepository userSessionRepository, IMobileLoginRepository mobileLoginRepository, ISmsOtpRepository smsOtpRepository,
            ILoginFailCounterRepository loginFailCounterRepository)
        {
            _customUserSvc = customUserSvc;
            _httpContextAccessor = httpContextAccessor;
            _userSessionRepository = userSessionRepository;
            _mobileLoginRepository = mobileLoginRepository;
            _smsOtpRepository = smsOtpRepository;
            _loginFailCounterRepository = loginFailCounterRepository;
            _environment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");
        }

        private const string CapthcaShowRequestText = "IsCapthcaShow";
        private const string FailLoginCountRequestText = "FailLoginCount";
        private const string SendOtpRequestText = "IsSendOtp";
        private const string OtpCodeRequestText = "OtpCode";
        private const string OtpCodeSendPhoneRequestText = "OtpMobilePhone";
        private const string CsrdTokenHeaderText = "CSRFTOKEN";
        private const string CaptchaKeyHeaderText = "captchaKey";


        public async Task ValidateAsync(ResourceOwnerPasswordValidationContext context)
        {
            var csrf_token = _httpContextAccessor.HttpContext.Request.Headers[CsrdTokenHeaderText].ToString();

            if (string.IsNullOrEmpty(csrf_token))
            {
                context.Result = new GrantValidationResult(TokenRequestErrors.InvalidRequest,
                    Messages.InvalitToken);
                return;
            }


            var errorCount = await _loginFailCounterRepository.GetCsrfTokenFailLoginCount(csrf_token);

            if (errorCount > 3 && errorCount <= 5)
            {
                var captchaKey = _httpContextAccessor.HttpContext.Request.Headers[CaptchaKeyHeaderText].ToString();

                if (string.IsNullOrEmpty(captchaKey))
                {
                    context.Result = new GrantValidationResult(TokenRequestErrors.InvalidRequest,
                        Messages.captchaKeyIsNotValid);
                    return;
                }



                if (_environment != ApplicationMode.PROD.ToString() && captchaKey == "kg")
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

            if (result)
            {
                await LoginSuccessProcess(context, errorCount, csrf_token);
                return;
            }



            errorCount = await _loginFailCounterRepository.IncCsrfTokenFailLoginCount(csrf_token);
            var customResponse = new Dictionary<string, object> { { FailLoginCountRequestText, errorCount } };

            if (errorCount >= 5)
            {
                var user = await _customUserSvc.FindByUserName(context.UserName);
                if (user == null)
                {
                    customResponse.Add(CapthcaShowRequestText, true);
                    context.Result = new GrantValidationResult(TokenRequestErrors.InvalidRequest, Messages.LoginFailUserNameNotExist, customResponse);
                    return;
                }

                if (!user.MobilPhoneVerify)
                {
                    customResponse.Add(CapthcaShowRequestText, true);
                    context.Result = new GrantValidationResult(TokenRequestErrors.InvalidRequest, Messages.YouHaveNotVerifyMobilePhone, customResponse);
                    return;
                }

                var otpResult = await SendOtpSms(AuthenticationProviderType.Person, user.MobilPhone, user.Id);

                if (otpResult != null)
                {
                    customResponse.Add(SendOtpRequestText, true);
                    customResponse.Add(CapthcaShowRequestText, false);
                    customResponse.Add(OtpCodeSendPhoneRequestText, otpResult.CellPhone.MaskPhoneNumber());
                    customResponse.Add("MobileLoginId", otpResult.Id);
                    if (_environment == ApplicationMode.DEV.ToString() ||
                         _environment == ApplicationMode.DEVTURKCELL.ToString())
                    {
                        customResponse.Add(OtpCodeRequestText, otpResult.Code);
                    }

                    context.Result = new GrantValidationResult(TokenRequestErrors.InvalidRequest, "", customResponse);
                    return;
                }
                customResponse.Add(CapthcaShowRequestText, true);
                context.Result = new GrantValidationResult(TokenRequestErrors.InvalidRequest, Messages.OtpNotCreate, customResponse);
                return;
            }

            var isCustomReqKey = customResponse.ContainsKey(CapthcaShowRequestText);
            if (!isCustomReqKey)
            {
                customResponse.Add(CapthcaShowRequestText, errorCount >= 3 && errorCount < 5);
            }

            context.Result = new GrantValidationResult(TokenRequestErrors.InvalidRequest,
                Messages.PassError + " " + Messages.LoginFail, customResponse);
        }

        private async Task LoginSuccessProcess(ResourceOwnerPasswordValidationContext context, int errorCount, string csrf_token)
        {
            var user = await _customUserSvc.FindByUserName(context.UserName);

            if (errorCount > 0)
            {
                await _loginFailCounterRepository.ResetCsrfTokenFailLoginCount(csrf_token);
            }

            var ip = _httpContextAccessor.HttpContext.Connection.RemoteIpAddress.ToString();
            var session = new UserSession()
            {
                UserId = user.Id,
                NotBefore = 1,
                SessionType = context.Request.Client.ClientId == IdentityServerConst.CLIENT_DIDE_WEB ? SessionType.Web :
                    context.Request.Client.ClientId == IdentityServerConst.CLIENT_DIDE_MOBILE ? SessionType.Mobile :
                    SessionType.None,
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
            await _userSessionRepository.SaveChangesAsync();

            context.Result = new GrantValidationResult(user.Id.ToString(), OidcConstants.AuthenticationMethods.Password,
                new List<Claim>
                {
                    new Claim(IdentityServerConst.IDENTITY_RESOURCE_SESSION_TYPE  , session.SessionType.ToString()),
                    new Claim(IdentityServerConst.IDENTITY_RESOURCE_SESSION_ID , addedSession.Id.ToString()),
                    new Claim(IdentityServerConst.IDENTITY_RESOURCE_USER_HAS_PACKAGE_ID  , (await _customUserSvc.UserHasPackage(user.Id)).ToString())
                });
        }

        private async Task<MobileLogin> SendOtpSms(AuthenticationProviderType providerType, string cellPhone, long userId)
        {
            var date = DateTime.Now;

            var mobileLogins = _mobileLoginRepository.Query()
                .Where(m => m.Provider == providerType && m.UserId == userId && m.Status == UsedStatus.Send)
                .Where(w => w.SendDate.AddSeconds(OtpConst.OtpExpSec) > date)
                .ToList();

            if (mobileLogins.Count > 0)
            {
                foreach (var item in mobileLogins)
                {
                    item.Status = UsedStatus.Cancelled;
                    _mobileLoginRepository.Update(item);
                }
                await _mobileLoginRepository.SaveChangesAsync();
            }

            int otp = RandomPassword.RandomNumberGenerator();

            if (_environment == ApplicationMode.DEV.ToString() || _environment == ApplicationMode.DEVTURKCELL.ToString())
                otp = 123456;

            if (_environment == ApplicationMode.PROD.ToString())
            {
                await _smsOtpRepository.ExecInsertSpForSms(cellPhone, userId, otp.ToString());
            }

            date = DateTime.Now;

            var mobileLogin = _mobileLoginRepository.Add(new MobileLogin
            {
                Code = otp,
                Status = UsedStatus.Send,
                SendDate = date,
                LastSendDate = date,
                UserId = userId,
                Provider = providerType,
                CellPhone = cellPhone,
                ReSendCount = 0
            });
            await _mobileLoginRepository.SaveChangesAsync();
            return mobileLogin;
        }
    }
}
