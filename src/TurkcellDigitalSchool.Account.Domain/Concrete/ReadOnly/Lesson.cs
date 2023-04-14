using TurkcellDigitalSchool.Core.Entities;
using TurkcellDigitalSchool.DbAccess.DataAccess.Abstract; 

namespace TurkcellDigitalSchool.Account.Domain.Concrete.ReadOnly
{
    public class Lesson : EntityDefault, IReadOnlyEntity
    {
        public string Name { get; set; }
        public int Order { get; set; }
        public bool IsActive { get; set; }
        public Classroom Classroom { get; set; }
        public long ClassroomId { get; set; } 
    }
}
