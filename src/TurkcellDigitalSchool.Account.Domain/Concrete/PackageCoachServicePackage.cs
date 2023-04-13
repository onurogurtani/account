using TurkcellDigitalSchool.Core.Entities;
using TurkcellDigitalSchool.Entities.Concrete;

namespace TurkcellDigitalSchool.Account.Entities.Concrete
{
    public class PackageCoachServicePackage : EntityDefault
    {
        public long PackageId { get; set; }
        public Package Package { get; set; }

        public long CoachServicePackageId { get; set; }
    }
}
