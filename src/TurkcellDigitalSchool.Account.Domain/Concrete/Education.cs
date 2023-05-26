using TurkcellDigitalSchool.Core.Entities;

namespace TurkcellDigitalSchool.Account.Domain.Concrete
{
    public class Education : EntityDefault
    {
        public long UserId { get; set; }
        public string GraduationStatus { get; set; }
        public int? GraduationYear { get; set; }
        public string DiplomaGrade { get; set; }
        public string YKSExperienceInformation { get; set; }
        public string Institution { get; set; }
        public string School { get; set; }
        public string Classroom { get; set; }
        public string Field { get; set; }
        public bool IsReligiousCultureCourseMust { get; set; }
    }
}