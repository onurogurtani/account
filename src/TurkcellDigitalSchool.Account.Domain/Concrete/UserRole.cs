using TurkcellDigitalSchool.Core.Entities;

namespace TurkcellDigitalSchool.Account.Entities.Concrete
{
    public class UserRole : EntityDefault
    {
        public long UserId { get; set; }
        public  User User { get; set; }
        public long RoleId { get; set; }
        public  Role Role { get; set; }
        public long? PackageId { get; set; }
        public Package Package { get; set; }
    }
}
