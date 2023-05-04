using TurkcellDigitalSchool.Account.Domain.Concrete.ReadOnly;
using TurkcellDigitalSchool.Core.Entities;
using TurkcellDigitalSchool.Core.Enums;

namespace TurkcellDigitalSchool.Account.Domain.Concrete
{
    public class StudentEducationInformation : EntityDefault
    {
        public long UserId { get; set; }
        public ExamType ExamType { get; set; }
        public long CityId { get; set; }
        public long CountyId { get; set; }
        public long InstitutionId { get; set; }
        public long SchoolId { get; set; }
        public long? ClassroomId { get; set; }
        public bool? IsGraduate { get; set; }
        public long? GraduationYearId { get; set; }
        public double? DiplomaGrade { get; set; }
        public YKSStatementEnum? YKSStatement { get; set; }
        public FieldType? FieldType { get; set; }
        public FieldType? PointType { get; set; }
        public bool? ReligionLessonStatus { get; set; }
        public Classroom Classroom { get; set; }
        public School School { get; set; }
        public City City { get; set; }
        public County County { get; set; }
        public User User { get; set; }
        public Institution Institution { get; set; }
        public GraduationYear GraduationYear { get; set; }
    }
}
