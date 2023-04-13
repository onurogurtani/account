using TurkcellDigitalSchool.Core.Entities;
using TurkcellDigitalSchool.Entities.Concrete.Core;

namespace TurkcellDigitalSchool.Account.Entities.Concrete
{
    public class OrganisationUser : EntityDefault
    {
        public long UserId { get; set; }
        public User User { get; set; }
        public long OrganisationId { get; set; }
        public TurkcellDigitalSchool.Entities.Concrete.Organisation Organisation { get; set; }
        public bool IsActive { get; set; }
    }
}
