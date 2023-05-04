using TurkcellDigitalSchool.Core.Entities;

namespace TurkcellDigitalSchool.Account.Domain.Concrete
{
    public class UserCommunicationPreferences : EntityDefault
    {
        public long UserId { get; set; }
        public bool? IsSms { get; set; }
        public bool? IsEMail { get; set; }
        public bool? IsCall { get; set; }
        public bool? IsNotification { get; set; }
        public User User { get; set; }
    }
}
