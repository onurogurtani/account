using TurkcellDigitalSchool.Core.Entities;

namespace TurkcellDigitalSchool.Account.Domain.Concrete
{
    public class BranchMainField : EntityDefault
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public bool IsActive { get; set; }
        public long? OrganisationId { get; set; }
        public Organisation Organisation { get; set; }
    }
}
