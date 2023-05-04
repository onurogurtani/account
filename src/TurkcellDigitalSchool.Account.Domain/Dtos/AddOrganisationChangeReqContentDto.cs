using TurkcellDigitalSchool.Core.Enums;

namespace TurkcellDigitalSchool.Account.Domain.Dtos
{
    public class AddOrganisationChangeReqContentDto
    {
        public OrganisationChangePropertyEnum PropertyEnum { get; set; }
        public string PropertyValue { get; set; }
    }
}
