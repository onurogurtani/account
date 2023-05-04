using TurkcellDigitalSchool.Core.Entities; 

namespace TurkcellDigitalSchool.Account.Domain.Concrete.ReadOnly
{
    public class Lesson :  IReadOnlyEntity
    {
        public string Name { get; set; }
        public int Order { get; set; }
        public bool IsActive { get; set; }
        public Classroom Classroom { get; set; }
        public long ClassroomId { get; set; }
        public long Id { get; set; }
        public bool IsDeleted { get; set; }
    }
}
