using TurkcellDigitalSchool.Core.Enums; 

namespace TurkcellDigitalSchool.Account.Domain.Dtos
{
    public class UpdateOrganisationChangeReqContentDto
    {
        public long Id { get; set; }
        public  long RequestId{ get; set; }
        public OrganisationChangePropertyEnum PropertyEnum { get; set; }
        public string PropertyValue { get; set; }
    }
}
