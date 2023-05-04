using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.Entities;
using TurkcellDigitalSchool.Core.Enums;

namespace TurkcellDigitalSchool.Account.Domain.Dtos
{
    public class OrganisationChangeReqContent : EntityDefault
    {
        public long RequestId { get; set; }

        public OrganisationChangePropertyEnum PropertyEnum { get; set; }
        public string PropertyValue { get; set; }


        public virtual OrganisationInfoChangeRequest Request { get; set; }

    }
}
