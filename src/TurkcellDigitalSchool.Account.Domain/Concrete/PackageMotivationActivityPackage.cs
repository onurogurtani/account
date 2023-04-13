using TurkcellDigitalSchool.Core.Entities;
using TurkcellDigitalSchool.Entities.Concrete;

namespace TurkcellDigitalSchool.Account.Entities.Concrete
{
    public class PackageMotivationActivityPackage : EntityDefault
    {
        public long PackageId { get; set; }
        public Package Package { get; set; }

        public long MotivationActivityPackageId { get; set; }
    }
}
