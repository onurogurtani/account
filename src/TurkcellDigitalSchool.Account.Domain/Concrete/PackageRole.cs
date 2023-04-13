using TurkcellDigitalSchool.Core.Entities; 

namespace TurkcellDigitalSchool.Account.Domain.Concrete
{
    public class PackageRole : EntityDefault
    {
        public long PackageId { get; set; }
        public Package Package { get; set; }
        public long RoleId { get; set; }
        public Role Role { get; set; }
    }
}
