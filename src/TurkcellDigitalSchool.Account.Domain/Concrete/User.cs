using System.Collections.Generic;
using TurkcellDigitalSchool.Core.Entities.Dtos;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Entities.Concrete.Core;

namespace TurkcellDigitalSchool.Account.Entities.Concrete
{
    public class User : UserDto
    {
        /// <summary>
        /// This is required when encoding token. Not in db. The default is Person.
        /// </summary>

        public byte[] PasswordSalt { get; set; }
        public byte[] PasswordHash { get; set; }

        public UserAddingType AddingType { get; set; } = UserAddingType.Default;
        public string RelatedIdentity { get; set; }
        public string OAuthAccessToken { get; set; }
        public string OAuthOpenIdConnectToken { get; set; }

        public RegisterStatus RegisterStatus { get; set; }
        public UserType UserType { get; set; }
        public int? FailLoginCount { get; set; }
        public int? FailOtpCount { get; set; }
        public virtual ICollection<UserRole> UserRoles { get; set; }

        public virtual ICollection<TurkcellDigitalSchool.Entities.Concrete.OrganisationUser> OrganisationUsers { get; set; }
    }

    public enum UserAddingType
    {
        Default = 0,

        TurkcellFastLogin = 1,

        Ldap = 2
    }
}
