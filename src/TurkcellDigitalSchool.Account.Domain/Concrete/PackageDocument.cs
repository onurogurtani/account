using System.Runtime.Serialization;
using Newtonsoft.Json;
using TurkcellDigitalSchool.Core.Entities; 

namespace TurkcellDigitalSchool.Account.Domain.Concrete
{
    public class PackageDocument : EntityDefault
    {
        public long PackageId { get; set; }
        [JsonIgnore]
        [IgnoreDataMember]
        public Package Package { get; set; }
        public long DocumentId { get; set; }
        public Document Document { get; set; }
    }
}
