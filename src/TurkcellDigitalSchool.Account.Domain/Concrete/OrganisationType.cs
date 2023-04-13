using TurkcellDigitalSchool.Core.Entities;

namespace TurkcellDigitalSchool.Account.Domain.Concrete
{
    public class OrganisationType : EntityDefinition
    {
        public string Description { get; set; }

        /// <summary>
        /// True: Singular (Tekil) Org. /
        /// False: Plural (Çoğul) Org.
        /// </summary>
        public bool IsSingularOrganisation { get; set; }
    }
}
