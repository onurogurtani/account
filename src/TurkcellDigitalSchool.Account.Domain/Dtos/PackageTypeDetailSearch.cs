using TurkcellDigitalSchool.Core.Utilities.Paging;

namespace TurkcellDigitalSchool.Account.Domain.Dtos
{
    public class PackageTypeDetailSearch : PaginationQuery
    {
        public string OrderBy { get; set; }
    }
}