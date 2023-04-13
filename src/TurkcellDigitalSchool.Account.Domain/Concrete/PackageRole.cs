using TurkcellDigitalSchool.Core.Entities;
using TurkcellDigitalSchool.Entities.Concrete.Core;

namespace TurkcellDigitalSchool.Account.Entities.Concrete
{
    public class PackageRole : EntityDefault
    {
        public long PackageId { get; set; }
        public Package Package { get; set; }
        public long RoleId { get; set; }
        public Role Role { get; set; }
    }
}
