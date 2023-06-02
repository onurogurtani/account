using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Text.Json.Serialization;
using TurkcellDigitalSchool.Core.Entities;
using TurkcellDigitalSchool.Core.Enums;

namespace TurkcellDigitalSchool.Account.Domain.Concrete
{
    public class Role : EntityDefinition
    {
        public string Description { get; set; }
        public bool IsOrganisationView { get; set; }
        public UserType UserType { get; set; }
        public ICollection<RoleClaim> RoleClaims { get; set; }
        public ICollection<UserRole> UserRoles { get; set; }
        [JsonIgnore]
        [IgnoreDataMember]
        public ICollection<PackageRole> PackageRoles { get; set; }
    }
}
