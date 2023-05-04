using System;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.Paging;

namespace TurkcellDigitalSchool.Account.Domain.Dtos
{
    public class DocumentDetailSearch : PaginationQuery
    {
        public string ContractKindName { get; set; }

        public RecordStatus? RecordStatus { get; set; }

        public long[] ContractTypeIds { get; set; } = new long[0];
        public long[] ContractKindIds { get; set; } = new long[0];


        public DateTime? ValidStartDate { get; set; }
        public DateTime? ValidEndDate { get; set; }

        public string OrderBy { get; set; }
    }
}