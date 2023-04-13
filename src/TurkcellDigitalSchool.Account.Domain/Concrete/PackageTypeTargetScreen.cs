using TurkcellDigitalSchool.Core.Entities;
using TurkcellDigitalSchool.Entities.Concrete;

namespace TurkcellDigitalSchool.Account.Entities.Concrete
{
    public class PackageTypeTargetScreen : EntityDefault
    {
        public long TargetScreenId { get; set; }
        public TargetScreen TargetScreen { get; set; }
        public long PackageTypeId { get; set; }
        public TurkcellDigitalSchool.Entities.Concrete.PackageType PackageType { get; set; } 
    }
}
