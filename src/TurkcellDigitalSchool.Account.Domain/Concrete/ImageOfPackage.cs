using TurkcellDigitalSchool.Account.Domain.Concrete.ReadOnly;
using TurkcellDigitalSchool.Core.Entities;

namespace TurkcellDigitalSchool.Account.Domain.Concrete
{
    public class ImageOfPackage : EntityDefault
    {
        public long PackageId { get; set; }
        public Package Package { get; set; }
        public long FileId { get; set; }
        public File File { get; set; }
    }
}
