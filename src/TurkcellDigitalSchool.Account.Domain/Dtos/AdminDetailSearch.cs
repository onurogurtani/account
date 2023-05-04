using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.Paging;

namespace TurkcellDigitalSchool.Account.Domain.Dtos
{
    /// <summary>
    /// Admin user search  
    /// </summary>
    public class AdminDetailSearch : PaginationQuery
    {
        public string Name { get; set; }
        public string SurName { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string MobilePhones { get; set; }
        public string CitizenId { get; set; }
        public long[] RoleIds { get; set; } = new long[0];
        public long[] OrganisationIds { get; set; } = new long[0];
        public UserType? UserType { get; set; }
    }
}