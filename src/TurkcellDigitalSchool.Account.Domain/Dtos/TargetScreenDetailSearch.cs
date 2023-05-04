using TurkcellDigitalSchool.Core.Utilities.Paging;

namespace TurkcellDigitalSchool.Account.Domain.Dtos
{
    public class TargetScreenDetailSearch : PaginationQuery
    {
        public string OrderBy { get; set; }
    }
}