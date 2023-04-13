using System;
using System.Collections.Generic;
using TurkcellDigitalSchool.Core.Entities;
using TurkcellDigitalSchool.Entities.Concrete;
using TurkcellDigitalSchool.Entities.Enums;

namespace TurkcellDigitalSchool.Account.Entities.Concrete
{
    public class OrganisationInfoChangeRequest : EntityDefault
    {
        public DateTime RequestDate { get; set; }
        public OrganisationChangeRequestState RequestState { get; set; }
        public OrganisationChangeResponseState ResponseState { get; set; }
        public long OrganisationId { get; set; }
        public ICollection<TurkcellDigitalSchool.Entities.Concrete.OrganisationChangeReqContent> OrganisationChangeReqContents { get; set; }

        public Organisation Organisation { get; set; }

        
    }
}
