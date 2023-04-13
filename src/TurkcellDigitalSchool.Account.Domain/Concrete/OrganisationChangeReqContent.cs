using TurkcellDigitalSchool.Core.Entities;
using TurkcellDigitalSchool.Entities.Concrete;
using TurkcellDigitalSchool.Entities.Enums;

namespace TurkcellDigitalSchool.Account.Entities.Concrete
{
    public class OrganisationChangeReqContent : EntityDefault
    {
        public long RequestId { get; set; }

        public OrganisationChangePropertyEnum PropertyEnum { get; set; }
        public string PropertyValue { get; set; }


        public virtual OrganisationInfoChangeRequest Request { get; set; }

    }
}
