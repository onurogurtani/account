using System.Collections.Generic;
using TurkcellDigitalSchool.Core.DataAccess;
using TurkcellDigitalSchool.Core.Entities.Dtos;
using TurkcellDigitalSchool.Core.Enums;

namespace TurkcellDigitalSchool.Account.Domain.Concrete
{
    public class User : UserDto, IPublishEntity
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
        public ExamKind? ExamKind { get; set; }
        public UserType UserType { get; set; }
        public int? FailLoginCount { get; set; }
        public int? FailOtpCount { get; set; }
        public virtual ICollection<UserRole> UserRoles { get; set; }

        public virtual ICollection<OrganisationUser> OrganisationUsers { get; set; }

        public bool IsLdapUser { get; set; }
    }
}
