using System.Runtime.Serialization;
using Newtonsoft.Json;
using TurkcellDigitalSchool.Core.Entities;
using TurkcellDigitalSchool.Core.Enums;
 

namespace TurkcellDigitalSchool.Account.Domain.Concrete
{
    public class PackageFieldType : EntityDefault
    {
        public long PackageId { get; set; }
        [JsonIgnore]
        [IgnoreDataMember]
        public Package Package { get; set; }

         public FieldType FieldType { get; set; }
    }
}
