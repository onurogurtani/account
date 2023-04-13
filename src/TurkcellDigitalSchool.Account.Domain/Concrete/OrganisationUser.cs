using TurkcellDigitalSchool.Core.Entities; 

namespace TurkcellDigitalSchool.Account.Domain.Concrete
{
    public class OrganisationUser : EntityDefault
    {
        public long UserId { get; set; }
        public User User { get; set; }
        public long OrganisationId { get; set; }
        public Organisation Organisation { get; set; }
        public bool IsActive { get; set; }
    }
}
