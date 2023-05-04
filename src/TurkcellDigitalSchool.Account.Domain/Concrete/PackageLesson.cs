using System.Runtime.Serialization;
using System.Text.Json.Serialization;
using TurkcellDigitalSchool.Account.Domain.Concrete.ReadOnly;
using TurkcellDigitalSchool.Core.DataAccess;
using TurkcellDigitalSchool.Core.Entities;

namespace TurkcellDigitalSchool.Account.Domain.Concrete
{
    public class PackageLesson : EntityDefault, IPublishEntity  
    {
        public long PackageId { get; set; }
        [JsonIgnore]
        [IgnoreDataMember] 
        public Package Package { get; set; }
        public long LessonId { get; set; }
        public Lesson Lesson { get; set; }
    }
}
