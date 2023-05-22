using System.Runtime.Serialization;
using Newtonsoft.Json;
using TurkcellDigitalSchool.Core.Entities; 

namespace TurkcellDigitalSchool.Account.Domain.Concrete
{
    public class PackageCoachServicePackage : EntityDefault
    {
        public long PackageId { get; set; }
        [JsonIgnore]
        [IgnoreDataMember]
        public Package Package { get; set; } 
        public long CoachServicePackageId { get; set; }
    }
}
