using System.Collections.Generic;
using TurkcellDigitalSchool.Core.Utilities.Paging;

namespace TurkcellDigitalSchool.Account.Domain.Dtos
{
    public class ContractKindDto : PaginationQuery
    {
        public List<long> ContractTypeIds { get; set; }
        public string OrderBy { get; set; }
    }
}