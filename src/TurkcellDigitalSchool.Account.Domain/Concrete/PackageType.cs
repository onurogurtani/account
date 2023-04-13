using System.Collections.Generic;
using TurkcellDigitalSchool.Core.Entities;
using TurkcellDigitalSchool.Entities.Concrete;

namespace TurkcellDigitalSchool.Account.Entities.Concrete
{
    public class PackageType : EntityDefault
    {
        public string Name { get; set; }
        public bool IsCanSeeTargetScreen { get; set; }
        public bool IsActive { get; set; }
        public ICollection<PackageTypeTargetScreen> PackageTypeTargetScreens { get; set; }

    }
}
