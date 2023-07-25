using TurkcellDigitalSchool.Core.Entities;

namespace TurkcellDigitalSchool.Account.Domain.Concrete
{
    public class CoachLeaderCoach : EntityDefault
    {
        public long UserId { get; set; }//CoachLeaderUserId
        public long CoachId { get; set; }
        public User User { get; set; }
        public User Coach { get; set; }
    }
}
