using System.Collections.Generic;

namespace TurkcellDigitalSchool.Account.Domain.Dtos
{
    public class AddOrganisationInfoChangeRequestDto
    {
        public ICollection<AddOrganisationChangeReqContentDto> OrganisationChangeReqContents { get; set; }

    }
}
