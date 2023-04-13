using TurkcellDigitalSchool.Core.Entities;
using TurkcellDigitalSchool.Entities.Concrete;

namespace TurkcellDigitalSchool.Account.Entities.Concrete
{
    public class PackagePublisher : EntityDefault
    {
        public long PackageId { get; set; }
        public Package Package { get; set; }
        public long PublisherId { get; set; }
        public Publisher Publisher { get; set; }
    }
}
