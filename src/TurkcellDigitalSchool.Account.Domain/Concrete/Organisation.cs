using System;
using System.Collections.Generic;
using TurkcellDigitalSchool.Account.Domain.Concrete.ReadOnly;
using TurkcellDigitalSchool.Core.Entities;
using TurkcellDigitalSchool.Entities.Enums;

namespace TurkcellDigitalSchool.Account.Domain.Concrete
{
    /// <summary>
    /// Kurum bilgileri
    /// </summary>
    public class Organisation : EntityDefinition
    {
        public long CrmId { get; set; }
        public string OrganisationManager { get; set; }
        public string CustomerNumber { get; set; }
        public string CustomerManager { get; set; }
        public long OrganisationTypeId { get; set; }
        public OrganisationType OrganisationType { get; set; }
        public string OrganisationAddress { get; set; }
        public string OrganisationMail { get; set; }
        public string OrganisationWebSite { get; set; }
        public long OrganisationImageId { get; set; }
        public SegmentType SegmentType { get; set; }
        public long CityId { get; set; }
        public long CountyId { get; set; }
        public string ContactName { get; set; }
        public string ContactMail { get; set; }
        public string ContactPhone { get; set; }
        public DateTime ContractStartDate { get; set; }
        public DateTime ContractFinishDate { get; set; }
        public PackageKind PackageKind { get; set; }
        public long PackageId { get; set; }
        public string PackageName { get; set; }
        public int LicenceNumber { get; set; }
        public string DomainName { get; set; }
        public DateTime MembershipStartDate { get; set; }
        public DateTime MembershipFinishDate { get; set; }
        public string AdminName { get; set; }
        public string AdminSurname { get; set; }
        public string AdminTc { get; set; }
        public string AdminMail { get; set; }
        public string AdminPhone { get; set; }
        public ServiceInfoChoice ServiceInfoChoice { get; set; }
        public string ContractNumber { get; set; }
        public string HostName { get; set; }
        public string ApiKey { get; set; }
        public string ApiSecret { get; set; }
        public int VirtualTrainingRoomQuota { get; set; }
        public int VirtualMeetingRoomQuota { get; set; }
        public OrganisationStatusInfo OrganisationStatusInfo { get; set; } = OrganisationStatusInfo.WaitingAction;
        public string ReasonForStatus { get; set; }
        public long? ParantId { get; set; }
        public virtual ICollection<OrganisationUser> OrganisationUsers { get; set; }
        public virtual ICollection<BranchMainField> BranchMainFields { get; set; }

    }
}
