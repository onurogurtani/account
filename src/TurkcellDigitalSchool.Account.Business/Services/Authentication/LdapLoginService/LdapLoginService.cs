using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;

namespace TurkcellDigitalSchool.Account.Business.Services.Authentication.LdapLoginService
{
    public class LdapLoginService : ILdapLoginService
    {
        private readonly string _ldapServer;
        private readonly string _ldapPort;
        public LdapLoginService(IConfiguration configuration)
        {
            _ldapServer = configuration["LdapConfiguration:Server"];
            _ldapPort = configuration["LdapConfiguration:Port"];
        }
        public Task<LdapResultModel> ValidateAsync(string username, string password)
        {
            return null;
        }
    }
}
