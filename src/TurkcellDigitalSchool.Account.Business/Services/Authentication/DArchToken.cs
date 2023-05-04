using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.Security.Jwt;

namespace TurkcellDigitalSchool.Account.Business.Services.Authentication
{
    public class DArchToken : AccessToken
    {
        public string ExternalUserId { get; set; }
        public AuthenticationProviderType Provider { get; set; } = AuthenticationProviderType.Person;
        public string OnBehalfOf { get; set; }
        public bool IsOldPassword { get; set; }
    }
}
