using TurkcellDigitalSchool.Core.Entities;
using TurkcellDigitalSchool.Entities.Concrete;
using Publisher = TurkcellDigitalSchool.Account.Domain.Concrete.ReadOnly.Publisher;

namespace TurkcellDigitalSchool.Account.Domain.Concrete
{
    public class PackagePublisher : EntityDefault
    {
        public long PackageId { get; set; }
        public Package Package { get; set; }
        public long PublisherId { get; set; }
        public Publisher Publisher { get; set; }
    }
}
