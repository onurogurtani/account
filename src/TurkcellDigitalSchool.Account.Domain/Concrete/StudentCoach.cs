using TurkcellDigitalSchool.Core.Entities;

namespace TurkcellDigitalSchool.Account.Domain.Concrete
{
    public class StudentCoach : EntityDefault
    {
        public long UserId { get; set; }//StudentUserId
        public long CoachId { get; set; }
        public User User { get; set; }
        public User Coach { get; set; }
    }
}
