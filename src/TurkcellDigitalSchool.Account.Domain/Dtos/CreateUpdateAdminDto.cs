using System.Collections.Generic;
using TurkcellDigitalSchool.Core.Enums;

namespace TurkcellDigitalSchool.Account.Domain.Dtos
{
    /// <summary>
    /// Admin user creat dto  with groups
    /// </summary>
    public class CreateUpdateAdminDto
    {
        public long Id { get; set; }
        public string UserName { get; set; }
        public string CitizenId { get; set; }
        public string Name { get; set; }
        public string SurName { get; set; }
        public string Email { get; set; }
        public string MobilePhones { get; set; }
        public bool Status { get; set; }
        public UserType UserType { get; set; }
        public List<long> RoleIds { get; set; }
    }
}
