using TurkcellDigitalSchool.Core.Enums;

namespace TurkcellDigitalSchool.Account.Domain.Dtos
{
    public class StudentEducationRequestDto
    {
        public long UserId { get; set; }
        public ExamType ExamType { get; set; }
        public long CityId { get; set; }
        public long CountyId { get; set; }
        public long InstitutionId { get; set; }
        public long SchoolId { get; set; }
        public long? ClassroomId { get; set; }
        public int? GraduationYear { get; set; }
        public double? DiplomaGrade { get; set; }
        public YKSStatementEnum? YKSExperienceInformation { get; set; }
        public FieldType? FieldType { get; set; }
        public FieldType? PointType { get; set; }
        public bool? ReligionLessonStatus { get; set; }
        public bool? IsGraduate { get; set; }
    }
}
