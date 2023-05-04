using System;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.Paging; 

namespace TurkcellDigitalSchool.Account.Domain.Dtos
{
    public class OrganisationDetailSearch : PaginationQuery
    {
        public string Name { get; set; }
        public long? OrganisationTypeId { get; set; }
        public string PackageName { get; set; }
        public string OrganisationManager { get; set; }
        public DateTime? MembershipStartDate { get; set; }
        public DateTime? MembershipFinishDate { get; set; }
        public string CustomerNumber { get; set; }
        public string DomainName { get; set; }
        public SegmentType? SegmentType { get; set; }
        public OrganisationStatusInfo? OrganisationStatusInfo { get; set; }
        public string OrderBy { get; set; }
    }
}
