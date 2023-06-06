using System.Runtime.Serialization;
using System.Text.Json.Serialization;
using TurkcellDigitalSchool.Account.Domain.Concrete.ReadOnly;
using TurkcellDigitalSchool.Core.Entities; 

namespace TurkcellDigitalSchool.Account.Domain.Concrete
{
    public class PackagePublisher : EntityDefault
    {
        public long PackageId { get; set; }
        [JsonIgnore]
        [IgnoreDataMember]
        public Package Package { get; set; }
        public long PublisherId { get; set; }
        public Publisher Publisher { get; set; }
    }
}
