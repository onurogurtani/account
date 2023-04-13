using TurkcellDigitalSchool.Core.Entities;
using TurkcellDigitalSchool.Entities.Concrete;
using TurkcellDigitalSchool.Entities.Enums;

namespace TurkcellDigitalSchool.Account.Entities.Concrete
{
    public class PackagePackageTypeEnum : EntityDefault
    {
        public long PackageId { get; set; }
        public Package Package { get; set; }

         public PackageTypeEnum PackageTypeEnum { get; set; }
    }
}
