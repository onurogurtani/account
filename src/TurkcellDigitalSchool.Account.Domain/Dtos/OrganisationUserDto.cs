using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.Enums; 

namespace TurkcellDigitalSchool.Account.Domain.Dtos
{
    public class OrganisationUserDto
    {
        public long Id { get; set; }
        public long CrmId { get; set; }
        public string Name { get; set; }
        public long CityId { get; set; }
        public long CountyId { get; set; }
        public string CityName { get; set; }
        public string CountyName { get; set; }
        public long OrganisationTypeId { get; set; }
        public OrganisationType OrganisationType { get; set; }
        public string OrganisationAddress { get; set; }
        public string OrganisationMail { get; set; }
        public string OrganisationWebSite { get; set; }
        public string ContractNumber { get; set; }
        public long OrganisationImageId { get; set; }
        public int LicenceNumber { get; set; }
        public PackageKind PackageKind { get; set; }
        public long PackageId { get; set; }
        public string PackageName { get; set; }
    }
}
