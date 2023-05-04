using System;
using System.Collections.Generic;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.Enums;

namespace TurkcellDigitalSchool.Account.Domain.Dtos
{
    public class GetOrganisationInfoChangeRequestDto
    {
        public long Id { get; set; }
        public DateTime RequestDate { get; set; }
        public OrganisationChangeRequestState RequestState { get; set; }
        public OrganisationChangeResponseState ResponseState { get; set; }
        public ICollection<GetOrganisationChangeReqContentDto> OrganisationChangeReqContents { get; set; }
        public string CityName { get; set; }
        public string CountyName { get; set; }
        public Organisation Organisation { get; set; }
      

    }
}
