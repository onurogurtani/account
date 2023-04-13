using TurkcellDigitalSchool.Core.Entities; 

namespace TurkcellDigitalSchool.Account.Domain.Concrete
{
    public class PackageTypeTargetScreen : EntityDefault
    {
        public long TargetScreenId { get; set; }
        public TargetScreen TargetScreen { get; set; }
        public long PackageTypeId { get; set; }
        public  PackageType PackageType { get; set; } 
    }
}
