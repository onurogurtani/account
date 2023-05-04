using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.Paging;

namespace TurkcellDigitalSchool.Account.Domain.Dtos
{
    public class ContractTypeDto : PaginationQuery
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public RecordStatus? RecordStatus { get; set; }
        public string OrderBy { get; set; }
    }
}
