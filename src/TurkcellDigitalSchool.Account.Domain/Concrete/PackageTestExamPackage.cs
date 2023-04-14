using TurkcellDigitalSchool.Core.Entities;

namespace TurkcellDigitalSchool.Account.Domain.Concrete
{
    public class PackageTestExamPackage : EntityDefault
    {
        public long PackageId { get; set; }
        public Package Package { get; set; } 
        public long TestExamPackageId { get; set; }
    }
}
