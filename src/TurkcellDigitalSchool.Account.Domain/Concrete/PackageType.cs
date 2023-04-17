using System.Collections.Generic;
using TurkcellDigitalSchool.Core.Entities; 

namespace TurkcellDigitalSchool.Account.Domain.Concrete
{
    public class PackageType : EntityDefault
    {
        public string Name { get; set; }
        public bool IsCanSeeTargetScreen { get; set; }
        public bool IsActive { get; set; }
        public ICollection<PackageTypeTargetScreen> PackageTypeTargetScreens { get; set; }

    }
}
