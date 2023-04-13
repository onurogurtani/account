using TurkcellDigitalSchool.Core.Entities;
using TurkcellDigitalSchool.Entities.Concrete;

namespace TurkcellDigitalSchool.Account.Entities.Concrete
{
    public class PackageDocument : EntityDefault
    {
        public long PackageId { get; set; }
        public Package Package { get; set; }
        public long DocumentId { get; set; }
        public Document Document { get; set; }
    }
}
