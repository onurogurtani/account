using System;
using System.Collections.Generic; 
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.DbAccess.DataAccess.Abstract; 
using TurkcellDigitalSchool.Entities.Enums;

namespace TurkcellDigitalSchool.Account.Domain.Concrete.ReadOnly
{
    /// <summary>
    /// Deneme Sınavı
    /// </summary>
    public class TestExam :   IReadOnlyEntity
    {
        public RecordStatus RecordStatus { get; set; } = RecordStatus.Active;
        public string Name { get; set; }
        public string Code { get; set; }
        public long TestExamTypeId { get; set; }
        public TestExamType TestExamType { get; set; }
        public bool IsLiveTestExam { get; set; }
        public string KeyWords { get; set; }
        public long ClassroomId { get; set; }
        public  Classroom Classroom { get; set; }
        public int Difficulty { get; set; }
        public int TestExamTime { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime FinishDate { get; set; }
        public TestExamStatus TestExamStatus { get; set; }
        public ExamType? ExamType { get; set; }
        public bool TransitionBetweenQuestions { get; set; }
        public bool TransitionBetweenSections { get; set; }
        public bool IsAllowDownloadPdf { get; set; } 
        public ICollection<PackageTestExam> PackageTestExams { get; set; }
        public long Id { get; set; }
        public bool IsDeleted { get; set; }
    }
}
