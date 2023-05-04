using System;
using System.Collections.Generic;
using TurkcellDigitalSchool.Core.Entities;
using TurkcellDigitalSchool.Core.Enums; 


namespace TurkcellDigitalSchool.Account.Domain.Concrete
{
    public class OrganisationInfoChangeRequest : EntityDefault
    {
        public DateTime RequestDate { get; set; }
        public OrganisationChangeRequestState RequestState { get; set; }
        public OrganisationChangeResponseState ResponseState { get; set; }
        public long OrganisationId { get; set; }
        public ICollection<OrganisationChangeReqContent> OrganisationChangeReqContents { get; set; }

        public Organisation Organisation { get; set; }

        
    }
}
