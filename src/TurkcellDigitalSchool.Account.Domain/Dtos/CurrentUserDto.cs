using System.Collections.Generic;
using TurkcellDigitalSchool.Core.Entities.Dtos;

namespace TurkcellDigitalSchool.Account.Domain.Dtos
{
    public class CurrentUserDto : UserDto
    {
        public List<string> Claims { get; set; }

        public List<UserOrganisation> UserOrganisation { get; set; }

        public PackageStatusDto PackageStatus { get;set;}
    }

    public class UserOrganisation : SelectionItem
    {
        public bool IsSingularOrganisation { get; set; }        
    }

}
