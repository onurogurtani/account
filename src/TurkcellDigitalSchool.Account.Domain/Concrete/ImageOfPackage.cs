using TurkcellDigitalSchool.Core.Entities;
using TurkcellDigitalSchool.Entities.Concrete;

namespace TurkcellDigitalSchool.Account.Entities.Concrete
{
    public class ImageOfPackage : EntityDefault
    {
        public long PackageId { get; set; }
        public Package Package { get; set; }
        public long FileId { get; set; }
        public File File { get; set; }
    }
}
