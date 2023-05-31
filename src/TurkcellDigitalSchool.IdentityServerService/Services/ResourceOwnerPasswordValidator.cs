using System.DirectoryServices.Protocols;
using System.Net;
using System.Security.Claims;
using System.Text;
using Duende.IdentityServer.Models;
using Duende.IdentityServer.Validation;
using IdentityModel;
using Microsoft.IdentityModel.Tokens;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.Constants.IdentityServer;
using TurkcellDigitalSchool.Core.CrossCuttingConcerns.Caching;
using TurkcellDigitalSchool.Core.CrossCuttingConcerns.Caching.Redis;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Extensions;
using TurkcellDigitalSchool.Core.Redis;
using TurkcellDigitalSchool.Core.Services.Session;
using TurkcellDigitalSchool.Core.Utilities.Mail;
using TurkcellDigitalSchool.Core.Utilities.Security.Captcha;
using TurkcellDigitalSchool.Core.Utilities.Toolkit;
using TurkcellDigitalSchool.IdentityServerService.Constants;
using TurkcellDigitalSchool.IdentityServerService.Services.Contract;
using TurkcellDigitalSchool.IdentityServerService.Services.Model;
using static TurkcellDigitalSchool.Account.Business.Handlers.Users.Commands.LdapUserInfoCommand.LdapUserInfoCommandHandler;

namespace TurkcellDigitalSchool.IdentityServerService.Services
{
    public class ResourceOwnerPasswordValidator : IResourceOwnerPasswordValidator
    {
        private readonly ICustomUserSvc _customUserSvc;
        private readonly ILoginFailCounterRepository _loginFailCounterRepository;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IUserSessionRepository _userSessionRepository;
        private readonly IUserRepository _userRepository;
        private readonly ICaptchaManager _captchaManager;
        private readonly IMobileLoginRepository _mobileLoginRepository;
        private readonly ISmsOtpRepository _smsOtpRepository;
        private readonly IMailService _mailService;
        private readonly IConfiguration _configuration;
        private readonly ILoginFailForgetPassSendLinkRepository _loginFailForgetPassSendLinkRepository;
        private readonly IAppSettingRepository _appSettingRepository;
        private readonly SessionRedisSvc _sessionRedisSvc;
        private readonly string _environment;
        private LdapConnection _ldapConnection;
        private SearchResponse _ldapSearchResponse;
        private LdapConfig ldapConfig;
        private string userDnInfo;
        public ResourceOwnerPasswordValidator(ICustomUserSvc customUserSvc, IHttpContextAccessor httpContextAccessor,
            IUserSessionRepository userSessionRepository, IMobileLoginRepository mobileLoginRepository, ISmsOtpRepository smsOtpRepository,
            ILoginFailCounterRepository loginFailCounterRepository, ICaptchaManager captchaManager, IMailService mailService, IUserRepository userRepository,
            IConfiguration configuration, ILoginFailForgetPassSendLinkRepository loginFailForgetPassSendLinkRepository, IAppSettingRepository appSettingRepository, SessionRedisSvc sessionRedisSvc)
        {
            _customUserSvc = customUserSvc;
            _httpContextAccessor = httpContextAccessor;
            _userSessionRepository = userSessionRepository;
            _userRepository = userRepository;
            _mobileLoginRepository = mobileLoginRepository;
            _smsOtpRepository = smsOtpRepository;
            _loginFailCounterRepository = loginFailCounterRepository;
            _captchaManager = captchaManager;
            _mailService = mailService;
            _configuration = configuration;
            _loginFailForgetPassSendLinkRepository = loginFailForgetPassSendLinkRepository;
            _environment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");
            _appSettingRepository = appSettingRepository;
            _sessionRedisSvc = sessionRedisSvc;
            ldapConfig = _configuration.GetSection("LdapConfig").Get<LdapConfig>();
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

            //ldap Login
            var ldapUser = _userRepository.GetAsync(u => u.UserName == context.UserName && !u.IsDeleted &&
                       u.Status && u.IsLdapUser);
            if (ldapUser.Result != null)
            {
                //LdapGiriş Kontrol
                if (isAdminConnectDAP().Result)
                {
                    bool isUserLogin = IsUserLoginAuth(context.UserName, context.Password).Result;
                    if (isUserLogin)
                    {
                        var user = await _customUserSvc.FindByUserName(context.UserName);
                        await LoginSuccessProcess(context, 0, csrf_token, user);
                        return;
                    }
                    else
                    {
                        context.Result = new GrantValidationResult(TokenRequestErrors.InvalidRequest,
                        Messages.LdapLoginFail);
                        return;
                    }
                }

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
                    var guid = await _customUserSvc.GenerateUserOldPassChange(user.Id);
                    var responseObject = new Dictionary<string, object>
                    {
                        { IsPasswordOldResponseText, isOldPass },
                        { "XId", Base64UrlEncoder.Encode(user.Id.ToString()) },
                        { "PasswordChangeGuid", guid}
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
            var session = new Account.Domain.Concrete.UserSession()
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



            var sessionInfo = await _sessionRedisSvc.GetAsync<UserSessionInfo>(user.Id.ToString());
            if (sessionInfo == null)
            {
                sessionInfo = new UserSessionInfo();
            }

            if (addedSession.SessionType == SessionType.Mobile)
            {
                sessionInfo.SessionIdMobil = addedSession.Id;
            }
            else if (addedSession.SessionType == SessionType.Web)
            {
                sessionInfo.SessionIdWeb = addedSession.Id;
            }

            try
            {
                await _sessionRedisSvc.SetAsync(user.Id.ToString(), sessionInfo);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }


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

            // Eski boş SMS kodu
            //  await _smsOtpRepository.ExecInsertSpForSms(cellPhone, userId, otp.ToString());
            // SMS servisi
            await _smsOtpRepository.Send(cellPhone, $"Şifreniz: {otp.ToString()}");



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

        private Task<bool> isAdminConnectDAP()
        {
            string host = ldapConfig.Host;
            string portValue = ldapConfig.PortValue;
            string adminUser = ldapConfig.AdminUser;
            string adminPass = ldapConfig.AdminPass;
            string ldapSecurityMethod = ldapConfig.PortValue;

            try
            {
                //LDAP Parametre validasyon kontrolü
                if (IsUserValidation().Result)
                {
                    int port = int.Parse(portValue);
                    _ldapConnection = new LdapConnection(host + ":" + port);

                    NetworkCredential authAdmin = new NetworkCredential(adminUser, adminPass);
                    _ldapConnection.Credential = authAdmin;
                    _ldapConnection.AuthType = AuthType.Basic;
                    _ldapConnection.SessionOptions.ProtocolVersion = 3;

                    _ldapConnection.SessionOptions.VerifyServerCertificate += delegate { return true; };
                    _ldapConnection.SessionOptions.SecureSocketLayer = true;
                    _ldapConnection.Bind();
                    return Task.FromResult(true);
                }
                else
                {
                    return Task.FromResult(false);
                }
            }
            catch (Exception ex)
            {
                //Admin LDAP bağlantısı gerçekleşmedi! ;
                _ldapConnection.Dispose();
                return Task.FromResult(false);
            }
        }
        private Task<bool> IsUserValidation()
        {
            if (ldapConfig.Host == "" || ldapConfig.PortValue == "" || ldapConfig.AdminUser == "" || ldapConfig.AdminPass == "" || ldapConfig.LdapSecurityMethod == "")
            {
                return Task.FromResult(false);
            }
            return Task.FromResult(true);
        }

        private Task<bool> IsUserLoginAuth(string userName, string userPassword)
        {

            //Kullanıcıya ait dn bilgisi yoksa önce kullanıcı var mı bakılıp dn bilgisinin dolması sağlanır
            if (IsThereAUserValid(userName).Result)
            {
                //Kullanıcı bulunduktan sonra dn bilgisi doldurulduğu için giriş doğrulama yapılsın
                return Task.FromResult(IsUserLoginAuthentication(userName, userPassword).Result);
            }
            return Task.FromResult(false);
        }

        //Kullanıcı Giriş Doğrulama
        private Task<bool> IsUserLoginAuthentication(string userName, string userPassword)
        {
            string host = ldapConfig.Host;
            string portValue = ldapConfig.PortValue;
            string adminUser = ldapConfig.AdminUser;
            string adminPass = ldapConfig.AdminPass;
            string ldapSecurityMethod = ldapConfig.PortValue;

            if (IsUserValidation().Result)
            {
                int port = int.Parse(portValue);
                LdapConnection connUserLogin = new LdapConnection(host + ":" + port);
                try
                {
                    NetworkCredential auth2 = new System.Net.NetworkCredential(userDnInfo, userPassword);
                    connUserLogin.Credential = auth2;
                    connUserLogin.AuthType = AuthType.Basic;

                    connUserLogin.SessionOptions.ProtocolVersion = 3;
                    connUserLogin.SessionOptions.VerifyServerCertificate += delegate { return true; };

                    connUserLogin.SessionOptions.SecureSocketLayer = true;

                    connUserLogin.Bind();
                    connUserLogin.Dispose();
                }
                catch (Exception ex)
                {
                    connUserLogin.Dispose();
                    return Task.FromResult(false);
                }
            }
            else
            {
                return Task.FromResult(false);
            }
            return Task.FromResult(true);
        }

        private Task<bool> IsThereAUserValid(string userName)
        {
            try
            {
                //LDAP injection saldırılarını önlemek için LDAP arama filtresinden çıkarma
                userName = EscapeLdapSearchFilter(userName);

                SearchRequest ldapSearchRequest;
                ldapSearchRequest = new SearchRequest(ldapConfig.Dn, string.Format($"(&(uid={userName})(objectClass=person)(status=1))"), System.DirectoryServices.Protocols.SearchScope.Subtree, null);
                if (_ldapConnection != null)
                {

                    _ldapSearchResponse = (SearchResponse)_ldapConnection.SendRequest(ldapSearchRequest);
                    if (_ldapSearchResponse.Entries.Count > 0)
                    {
                        userDnInfo = _ldapSearchResponse.Entries[0].DistinguishedName;
                        return Task.FromResult(true);
                    }
                }
            }
            catch (Exception ex)
            {
                _ldapConnection.Dispose();
                return Task.FromResult(false);
            }
            return Task.FromResult(false);
        }

        /// <summary>
        /// Escapes the LDAP search filter to prevent LDAP injection attacks.
        /// </summary>
        /// <param name="searchFilter">The search filter.</param>
        /// <returns>The escaped search filter.</returns>
        private static string EscapeLdapSearchFilter(string searchFilter)
        {
            var escape = new StringBuilder();
            foreach (var current in searchFilter)
            {
                switch (current)
                {
                    case '\\':
                        escape.Append(@"\5c");
                        break;

                    case '*':
                        escape.Append(@"\2a");
                        break;

                    case '(':
                        escape.Append(@"\28");
                        break;

                    case ')':
                        escape.Append(@"\29");
                        break;

                    case '\u0000':
                        escape.Append(@"\00");
                        break;

                    case '/':
                        escape.Append(@"\2f");
                        break;

                    default:
                        escape.Append(current);
                        break;
                }
            }

            return escape.ToString();
        }

    }
}
