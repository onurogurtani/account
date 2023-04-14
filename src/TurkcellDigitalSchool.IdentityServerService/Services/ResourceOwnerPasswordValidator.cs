using System.Security.Claims;
using Duende.IdentityServer.Models;
using Duende.IdentityServer.Validation;
using IdentityModel;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Org.BouncyCastle.Asn1.Ocsp;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.DataAccess.Concrete.EntityFramework;
using TurkcellDigitalSchool.Core.Constants.IdentityServer;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Extensions;
using TurkcellDigitalSchool.Core.Utilities.Mail;
using TurkcellDigitalSchool.Core.Utilities.Security.Captcha;
using TurkcellDigitalSchool.Core.Utilities.Toolkit;
using TurkcellDigitalSchool.Entities.Concrete;
using TurkcellDigitalSchool.Entities.Concrete.Core;
using TurkcellDigitalSchool.IdentityServerService.Constants;
using TurkcellDigitalSchool.IdentityServerService.Services.Contract;
using TurkcellDigitalSchool.IdentityServerService.Services.Model;
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
        private readonly IMailService _mailService;
        private readonly IConfiguration _configuration;
        private readonly ILoginFailForgetPassSendLinkRepository _loginFailForgetPassSendLinkRepository;
        private readonly IAppSettingRepository _appSettingRepository;
        private readonly string _environment;

        public ResourceOwnerPasswordValidator(ICustomUserSvc customUserSvc, IHttpContextAccessor httpContextAccessor,
            IUserSessionRepository userSessionRepository, IMobileLoginRepository mobileLoginRepository, ISmsOtpRepository smsOtpRepository,
            ILoginFailCounterRepository loginFailCounterRepository, ICaptchaManager captchaManager, IMailService mailService,
            IConfiguration configuration, ILoginFailForgetPassSendLinkRepository loginFailForgetPassSendLinkRepository, IAppSettingRepository appSettingRepository)
        {
            _customUserSvc = customUserSvc;
            _httpContextAccessor = httpContextAccessor;
            _userSessionRepository = userSessionRepository;
            _mobileLoginRepository = mobileLoginRepository;
            _smsOtpRepository = smsOtpRepository;
            _loginFailCounterRepository = loginFailCounterRepository;
            _captchaManager = captchaManager;
            _mailService = mailService;
            _configuration = configuration;
            _loginFailForgetPassSendLinkRepository = loginFailForgetPassSendLinkRepository;
            _environment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");
            _appSettingRepository = appSettingRepository;
        }

        private const string CapthcaShowRequestText = "IsCapthcaShow";
        private const string ResetMailSendedRequestText = "IdsResetMailSended";
        private const string FailLoginCountRequestText = "FailLoginCount";
        private const string SendOtpRequestText = "IsSendOtp";
        private const string IsPasswordOldResponseText = "IsPasswordOld";
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

            if (errorCount >= 3 && errorCount < 5)
            {
                var captchaKey = _httpContextAccessor.HttpContext.Request.Headers[CaptchaKeyHeaderText].ToString();

                if (string.IsNullOrEmpty(captchaKey))
                {
                    var responseObject = new Dictionary<string, object> { { FailLoginCountRequestText, errorCount } };
                    responseObject.Add(CapthcaShowRequestText, true);
                    context.Result = new GrantValidationResult(TokenRequestErrors.InvalidRequest,
                        Messages.captchaKeyIsNotValid, responseObject);
                    return;
                }

                if (!((_environment == ApplicationMode.DEV.ToString() || _environment == ApplicationMode.DEV.ToString()) && captchaKey == "kg"))
                {
                    if (!_captchaManager.Validate(captchaKey))
                    {
                        var responseObject = new Dictionary<string, object> { { FailLoginCountRequestText, errorCount } };
                        responseObject.Add(CapthcaShowRequestText, true);
                        context.Result = new GrantValidationResult(TokenRequestErrors.InvalidRequest,
                           Messages.captchaKeyIsNotValid, responseObject);
                        return;
                    }
                }
            }

            var result = await _customUserSvc.Validate(context.UserName, context.Password);

            if (result)
            {
                var user = await _customUserSvc.FindByUserName(context.UserName);

                var isOldPass = await IsOldPassword(user);

                if (isOldPass)
                {
                    var responseObject = new Dictionary<string, object>
                    {
                        { IsPasswordOldResponseText, isOldPass },
                        { "XId", Base64UrlEncoder.Encode(user.Id.ToString()) },
                        { "PasswordChangeGuid", Base64UrlEncoder.Encode(user.Id.ToString()) }
                    };
                    context.Result = new GrantValidationResult(TokenRequestErrors.InvalidRequest,
                        Messages.passwordIsOldMessage, responseObject);
                    return;
                } 
                await LoginSuccessProcess(context, errorCount, csrf_token, user);
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
                    if (user.EMailVerify)
                    {
                        await SendPasswordChangeMail(user.Id, user.EMail);
                        customResponse.Add(ResetMailSendedRequestText, true);
                        context.Result = new GrantValidationResult(TokenRequestErrors.InvalidRequest, Messages.PasswordChangeLinkSendedEMail, customResponse);
                        return;
                    }
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
                    customResponse.Add("XId", Base64UrlEncoder.Encode(otpResult.UserId.ToString()));
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

        private async Task LoginSuccessProcess(ResourceOwnerPasswordValidationContext context, int errorCount, string csrf_token, CustomUserDto user)
        {
            if (errorCount > 0)
            {
                await _loginFailCounterRepository.ResetCsrfTokenFailLoginCount(csrf_token);
            }

            if (user.FailOtpCount > 0)
            {
                await _customUserSvc.ResetUserOtpFailount(user.Id);
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
            var hasPackage = (await _customUserSvc.UserHasPackage(user.Id)).ToString();


            context.Result = new GrantValidationResult(user.Id.ToString(), OidcConstants.AuthenticationMethods.Password,
            new List<Claim>
                {
                    new Claim(IdentityServerConst.IDENTITY_RESOURCE_SESSION_TYPE  , session.SessionType.ToString()),
                    new Claim(IdentityServerConst.IDENTITY_RESOURCE_SESSION_ID , addedSession.Id.ToString()),
                    new Claim(IdentityServerConst.IDENTITY_RESOURCE_USER_HAS_PACKAGE_ID  ,hasPackage )
            });
        }

        private async Task<bool> IsOldPassword(CustomUserDto user)
        {
            var value = _appSettingRepository.Query().Where(x => x.Code == "PasswordRefreshPeriod").Select(x => x.Value).FirstOrDefault();
            var intVal = 0;
            if (Int32.TryParse(value, out intVal))
            {
                if (user.LastPasswordDate.ToUniversalTime().AddMonths(intVal) < DateTime.Now)
                {
                    return true;
                }
            }
            return false;
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

        private async Task SendPasswordChangeMail(long userId, string email)
        {
            var guid = Guid.NewGuid().ToString();
            var expDate = DateTime.Now.AddHours(OtpConst.NewPassLinkExpHour);
            _loginFailForgetPassSendLinkRepository.Add(new LoginFailForgetPassSendLink
            {
                Guid = guid,
                UserId = userId,
                UsedStatus = UsedStatus.Send,
                ExpDate = expDate
            });
            await _loginFailForgetPassSendLinkRepository.SaveChangesAsync();
            var xid = Base64UrlEncoder.Encode(userId.ToString());

            var link = _configuration.GetSection("ResetPasswordSetting").GetSection("ResetPasswordUserLink").Value +
                       guid + "&XId=" + xid;

            var content = " Şifrenizi yenilemek için  <a href=\"" + link + "\"> tıklayınız </a>. ";
            _mailService.Send(new EmailMessage
            {
                Subject = "Şifre Yenileme",
                ToAddresses = new List<EmailAddress> { new EmailAddress { Address = email } },
                Content = content
            });
        }
    }
}
