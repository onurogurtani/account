using TurkcellDigitalSchool.Core.Utilities.Paging;

namespace TurkcellDigitalSchool.Account.Domain.Dtos
{
    public class StudentAnswerTargetRangeDetailSearch : PaginationQuery
    {
        public long Id { get; set; }
        public long UserId { get; set; }
        public long PackageId { get; set; }
        public string OrderBy { get; set; }
    }
}
