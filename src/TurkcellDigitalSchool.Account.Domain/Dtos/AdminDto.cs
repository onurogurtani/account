using System;
using System.Collections.Generic;
using TurkcellDigitalSchool.Core.Enums;

namespace TurkcellDigitalSchool.Account.Domain.Dtos
{
    /// <summary>
    /// Admin user Dto with groups
    /// </summary>
    public class AdminDto
    {
        public long Id { get; set; }
        public string UserName { get; set; }
        public long CitizenId { get; set; }
        public string Name { get; set; }
        public string SurName { get; set; }
        public string Email { get; set; }
        public string MobilePhones { get; set; }
        public string TheInstitutionConnected { get; set; }
        public bool Status { get; set; }
        public UserType UserType { get; set; }
        public DateTime? LastLoginDate { get; set; }
        public List<RoleDto> Roles { get; set; }
    }


    public class RoleDto
    {
        public long Id { get; set; }
        public string Name { get; set; }
    }
}
