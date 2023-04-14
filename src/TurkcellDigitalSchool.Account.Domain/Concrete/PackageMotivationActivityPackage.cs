using TurkcellDigitalSchool.Core.Entities; 

namespace TurkcellDigitalSchool.Account.Domain.Concrete
{
    public class PackageMotivationActivityPackage : EntityDefault
    {
        public long PackageId { get; set; }
        public Package Package { get; set; } 
        public long MotivationActivityPackageId { get; set; }
    }
}
