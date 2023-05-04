using TurkcellDigitalSchool.Account.Domain.Concrete;

namespace TurkcellDigitalSchool.Account.Domain.Dtos
{
    public class OrganisationTypeDto : OrganisationType    {

        public bool IsSingularOrPluralChangeable { get; set; }
    }
}
