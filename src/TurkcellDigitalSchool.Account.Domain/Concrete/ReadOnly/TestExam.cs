using System;
using System.Collections.Generic;
using TurkcellDigitalSchool.Core.Entities;
using TurkcellDigitalSchool.DbAccess.DataAccess.Abstract;
using TurkcellDigitalSchool.Entities.Concrete;
using TurkcellDigitalSchool.Entities.Enums;

namespace TurkcellDigitalSchool.Account.Domain.Concrete.ReadOnly
{
    /// <summary>
    /// Deneme Sınavı
    /// </summary>
    public class TestExam : EntityDefinition, IReadOnlyEntity
    {
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
    }
}
