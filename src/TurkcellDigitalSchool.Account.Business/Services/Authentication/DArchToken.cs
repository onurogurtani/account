using TurkcellDigitalSchool.Core.Utilities.Security.Jwt;
using TurkcellDigitalSchool.Entities.Concrete.Core;

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
