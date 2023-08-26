using TurkcellDigitalSchool.Core.Entities;

namespace TurkcellDigitalSchool.Account.Domain.Concrete
{
    public class StudentParentInformation : EntityDefault
    {
        public long UserId { get; set; }//StudentUserId
        public long ParentId { get; set; }
        public User User { get; set; }
        public User Parent { get; set; }
        public bool StudentAccessToChat { get; set; }
    }
}
