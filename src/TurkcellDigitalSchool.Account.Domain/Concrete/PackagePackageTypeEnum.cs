using TurkcellDigitalSchool.Core.Entities; 
using TurkcellDigitalSchool.Entities.Enums;

namespace TurkcellDigitalSchool.Account.Domain.Concrete
{
    public class PackagePackageTypeEnum : EntityDefault
    {
        public long PackageId { get; set; }
        public Package Package { get; set; }

         public PackageTypeEnum PackageTypeEnum { get; set; }
    }
}
