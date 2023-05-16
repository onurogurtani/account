using System.Collections.Generic;
using System.Text.Json.Serialization;
using TurkcellDigitalSchool.Core.Entities; 

namespace TurkcellDigitalSchool.Account.Domain.Concrete.ReadOnly
{
    public class Classroom :   IReadOnlyEntity
    {
        public string Name { get; set; }
        public string Code { get; set; } 
        public bool IsActive { get; set; }

        [JsonIgnore]
        public virtual ICollection<Lesson> Lessons { get; set; }
        public long Id { get; set; }
        public bool IsDeleted { get; set; }
    }
}
