using TurkcellDigitalSchool.Core.Entities; 

namespace TurkcellDigitalSchool.Account.Domain.Concrete
{
    public class PackageCoachServicePackage : EntityDefault
    {
        public long PackageId { get; set; }
        public Package Package { get; set; } 
        public long CoachServicePackageId { get; set; }
    }
}
