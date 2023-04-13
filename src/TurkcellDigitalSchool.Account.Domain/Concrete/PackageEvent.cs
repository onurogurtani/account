using System.Runtime.Serialization;
using System.Text.Json.Serialization;
using TurkcellDigitalSchool.Core.Entities;
using TurkcellDigitalSchool.Entities.Concrete;

namespace TurkcellDigitalSchool.Account.Domain.Concrete
{
    public class PackageEvent : EntityDefault
    {
        public long PackageId { get; set; }
        [JsonIgnore]
        [IgnoreDataMember] 
        public Package Package { get; set; }  
        
        public long EventId { get; set; }
        public Event Event { get; set; }

    }
}
