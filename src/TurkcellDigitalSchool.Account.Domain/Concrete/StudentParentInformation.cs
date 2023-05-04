using TurkcellDigitalSchool.Core.Entities;

namespace TurkcellDigitalSchool.Account.Domain.Concrete
{
    public class StudentParentInformation : EntityDefault
    {
        public long UserId { get; set; }//StudentUserId
        public string Name { get; set; }
        public string SurName { get; set; }
        public string CitizenId { get; set; }
        public string Email { get; set; }
        public string MobilPhones { get; set; }
        public User User { get; set; }
    }
}
