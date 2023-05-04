using System.Collections.Generic;

namespace TurkcellDigitalSchool.Account.Domain.Dtos
{
    public class UpdateOrganisationInfoChangeRequestDto
    {
        public long Id { get; set; }
     
        public ICollection<UpdateOrganisationChangeReqContentDto> OrganisationChangeReqContents { get; set; }

    }
}
