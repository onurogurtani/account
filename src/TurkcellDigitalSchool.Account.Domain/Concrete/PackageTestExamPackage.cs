using TurkcellDigitalSchool.Core.Entities;

namespace TurkcellDigitalSchool.Account.Entities.Concrete
{
    public class PackageTestExamPackage : EntityDefault
    {
        public long PackageId { get; set; }
        public Package Package { get; set; }

        public long TestExamPackageId { get; set; }
    }
}
