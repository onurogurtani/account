using System.Collections.Generic;
using TurkcellDigitalSchool.Core.Enums;

namespace TurkcellDigitalSchool.Account.Domain.Dtos
{
    public class AddRoleDto
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public bool IsOrganisationView { get; set; }
        public UserType UserType { get; set; }
        public RecordStatus RecordStatus { get; set; } = RecordStatus.Active;
        public ICollection<AddRoleClaimDto> RoleClaims { get; set; }
    }
}
