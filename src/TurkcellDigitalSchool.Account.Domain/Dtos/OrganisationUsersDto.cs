using System.Collections.Generic;

namespace TurkcellDigitalSchool.Account.Domain.Dtos
{
    public class OrganisationUsersDto
    {
        public long UserId { get; set; }
        public List<OrganisationUserDto> OrganisationUsers { get; set; }
       
    }
}
