using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.Paging;

namespace TurkcellDigitalSchool.Account.Domain.Dtos
{
    public class RoleDetailSearch : PaginationQuery
    {
        public UserType[] UserTypes { get; set; } = new UserType[0];
        public long[] RoleIds { get; set; } = new long[0];
        public string[] ClaimNames { get; set; } = new string[0];
        public bool? IsOrganisationView { get; set; }
        public RecordStatus? RecordStatus { get; set; }
        public string OrderBy { get; set; }
    }
}
