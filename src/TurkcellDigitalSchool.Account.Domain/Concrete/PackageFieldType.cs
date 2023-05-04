using TurkcellDigitalSchool.Core.Entities;
using TurkcellDigitalSchool.Core.Enums;
 

namespace TurkcellDigitalSchool.Account.Domain.Concrete
{
    public class PackageFieldType : EntityDefault
    {
        public long PackageId { get; set; }
        public Package Package { get; set; }

         public FieldType FieldType { get; set; }
    }
}
