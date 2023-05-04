using System.Collections.Generic;
using TurkcellDigitalSchool.Core.Enums;

namespace TurkcellDigitalSchool.Account.Domain.Dtos
{
    public class UpdateRoleDto
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public bool IsOrganisationView { get; set; }
        public UserType UserType { get; set; }
        public ICollection<UpdateRoleClaimDto> RoleClaims { get; set; }
    }
}
