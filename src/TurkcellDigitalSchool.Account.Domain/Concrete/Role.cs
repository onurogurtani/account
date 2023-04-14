using System.Collections.Generic;
using TurkcellDigitalSchool.Core.Entities;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Entities.Concrete.Core;

namespace TurkcellDigitalSchool.Account.Domain.Concrete
{
    public class Role : EntityDefinition
    {
        public string Description { get; set; }
        public bool IsOrganisationView { get; set; }
        public UserType UserType { get; set; }
        public ICollection<RoleClaim> RoleClaims { get; set; }
        public ICollection<UserRole> UserRoles { get; set; }
        public ICollection<PackageRole> PackageRoles { get; set; }
    }
}
