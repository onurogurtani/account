using System;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.Paging; 

namespace TurkcellDigitalSchool.Account.Domain.Dtos
{
    public class OrganisationChangeRequestDetailSearch : PaginationQuery
    {
        public long? Id { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? FinishDate { get; set; }
        public OrganisationChangeRequestState? RecordStatus { get; set; }
        public string OrderBy { get; set; }
    }
}
