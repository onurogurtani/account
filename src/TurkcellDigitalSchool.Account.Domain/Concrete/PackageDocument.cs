using TurkcellDigitalSchool.Core.Entities; 

namespace TurkcellDigitalSchool.Account.Domain.Concrete
{
    public class PackageDocument : EntityDefault
    {
        public long PackageId { get; set; }
        public Package Package { get; set; }
        public long DocumentId { get; set; }
        public Document Document { get; set; }
    }
}
