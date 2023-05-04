using System;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.Paging;

namespace TurkcellDigitalSchool.Account.Domain.Dtos
{
    /// <summary>
    /// User search  
    /// </summary>
    public class UserDetailSearch : PaginationQuery
    {
        public string Name { get; set; }
        public string SurName { get; set; }
        public long CitizenId { get; set; }
        public string Email { get; set; }
        public string MobilePhones { get; set; }
        public UserType UserTypeId { get; set; }
        public bool[] PackageBuyStatus { get; set; } = Array.Empty<bool>();
        public string OrderBy { get; set; }
    }
}
