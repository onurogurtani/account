using TurkcellDigitalSchool.Core.Entities;

namespace TurkcellDigitalSchool.Account.Domain.Concrete
{
    public class UserSupportTeamViewMyData : EntityDefault
    {
        public long UserId { get; set; }
        public bool IsViewMyData { get; set; }
        public bool? IsFifteenMinutes { get; set; }
        public bool? IsOneMonth { get; set; }
        public bool? IsAlways { get; set; }
        public User User { get; set; }
    }
}
