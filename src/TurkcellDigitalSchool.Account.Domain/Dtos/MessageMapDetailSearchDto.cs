using TurkcellDigitalSchool.Core.Utilities.Paging;

namespace TurkcellDigitalSchool.Account.Domain.Dtos
{
    public class MessageMapDetailSearchDto : PaginationQuery
    {
        public GetMessageMapListQueryDto[] QueryDto { get; set; }
        public string OrderBy { get; set; }
    }

    public class GetMessageMapListQueryDto
    {
        public string Field { get; set; }
        public string Text { get; set; }
    }
}

