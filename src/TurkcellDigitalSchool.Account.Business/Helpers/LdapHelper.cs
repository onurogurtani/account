using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.DirectoryServices.Protocols;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using static TurkcellDigitalSchool.Account.Business.Handlers.Users.Commands.LdapUserInfoCommand.LdapUserInfoCommandHandler;

namespace TurkcellDigitalSchool.Account.Business.Helpers
{
    public interface ILdapHelper
    {
        Task<LdapResponse> Login(string userName, string password);
    }
    public class LdapHelper : ILdapHelper
    {
        private readonly IUserRepository _userRepository;
        private readonly IConfiguration _configuration;
        private LdapConnection _ldapConnection;
        private SearchResponse _ldapSearchResponse;
        private LdapConfig ldapConfig;
        private string userDnInfo;

        public LdapHelper(IUserRepository userRepository, IConfiguration configuration)
        {
            _userRepository = userRepository;
            _configuration = configuration;
            ldapConfig = _configuration.GetSection("LdapConfig").Get<LdapConfig>();
        }

        /// <summary>
        /// Connect Ldap and chech user is Login to Ldap
        /// </summary>
        /// <param name="userName"></param>
        /// <param name="password"></param>
        /// <returns></returns>
        public async Task<LdapResponse> Login(string userName, string password)
        {
            var ldapResponse = new LdapResponse();

            //LdapGiriş Kontrol
            ldapResponse = ConnectLdap().Result;
            if (ldapResponse.Success)
            {
                return IsUserLoginAuth(userName, password).Result;
            }
            return ldapResponse;
        }

        /// <summary>
        /// Connect with user with ldap Administrator privileges
        /// </summary>
        /// <returns></returns>
        public async Task<LdapResponse> ConnectLdap()
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
                    return new LdapResponse { Success = true };
                }
                else
                {
                    return new LdapResponse { Success = false, Message = "Ldap User/password incorrect" };
                }
            }
            catch (Exception ex)
            {
                //Admin LDAP bağlantısı gerçekleşmedi! ;
                _ldapConnection.Dispose();
                return new LdapResponse { Success = false, Message = ex.Message };
            }
        }

        /// <summary>
        /// Check is User Login to Ldap with given username and password
        /// </summary>
        /// <param name="userName"></param>
        /// <param name="password"></param>
        /// <returns></returns>
        public async Task<LdapResponse> IsUserLoginAuth(string userName, string password)
        {
            //Kullanıcıya ait dn bilgisi yoksa önce kullanıcı var mı bakılıp dn bilgisinin dolması sağlanır
            if (IsThereAUserValid(userName).Result)
            {
                //Kullanıcı bulunduktan sonra dn bilgisi doldurulduğu için giriş doğrulama yapılsın
                return IsUserLoginAuthentication(userName, password).Result;
            }
            return new LdapResponse { Success = false };
        }

        /// <summary>
        /// Validate User info
        /// </summary>
        /// <returns></returns>
        private async Task<bool> IsUserValidation()
        {
            if (ldapConfig.Host == "" || ldapConfig.PortValue == "" || ldapConfig.AdminUser == "" || ldapConfig.AdminPass == "" || ldapConfig.LdapSecurityMethod == "")
            {
                return false;
            }
            return true;
        }

        //Kullanıcı Giriş Doğrulama
        private async Task<LdapResponse> IsUserLoginAuthentication(string userName, string userPassword)
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
                    return new LdapResponse { Success = false, Message = ex.Message };
                }
            }
            else
            {
                return new LdapResponse { Success = false, Message = "Ldap User/password incorrect" };
            }
            return new LdapResponse { Success = true };
        }

        private async Task<bool> IsThereAUserValid(string userName)
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
                        return true;
                    }
                }
            }
            catch (Exception ex)
            {
                _ldapConnection.Dispose();
                return false;
            }
            return false;
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

    public class LdapResponse
    {
        public bool Success { get; set; } = false;
        public string Message { get; set; }
    }
}
