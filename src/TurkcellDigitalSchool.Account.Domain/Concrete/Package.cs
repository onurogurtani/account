using System;
using System.Collections.Generic;
using TurkcellDigitalSchool.Core.Entities;
using TurkcellDigitalSchool.Entities.Concrete;
using TurkcellDigitalSchool.Entities.Enums;
using PackageTestExam = TurkcellDigitalSchool.Account.Domain.Concrete.ReadOnly.PackageTestExam;

namespace TurkcellDigitalSchool.Account.Domain.Concrete
{
    public class Package : EntityDefault
    {
        public bool HasCoachService { get; set; }
        public bool HasTryingTest { get; set; }
        public int? TryingTestQuestionCount { get; set; }
        public bool HasMotivationEvent { get; set; }
        public PackageKind PackageKind { get; set; }

        public string Name { get; set; }
        public string Summary { get; set; }
        public string Content { get; set; }

        public bool IsActive { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime FinishDate { get; set; }
        public virtual ICollection<PackageLesson> PackageLessons { get; set; }
        public virtual ICollection<ImageOfPackage> ImageOfPackages { get; set; }
        public virtual ICollection<PackageRole> PackageRoles { get; set; }
        public virtual ICollection<PackagePublisher> PackagePublishers { get; set; }
        public virtual ICollection<PackageDocument> PackageDocuments { get; set; }
        public virtual ICollection<PackageContractType> PackageContractTypes { get; set; }

        public virtual ICollection<PackageFieldType> PackageFieldTypes { get; set; }
        public virtual ICollection<PackagePackageTypeEnum> PackagePackageTypeEnums { get; set; }
        public virtual ICollection<PackageTestExamPackage> TestExamPackages { get; set; }
        public virtual ICollection<PackageCoachServicePackage> CoachServicePackages { get; set; }
        public virtual ICollection<PackageMotivationActivityPackage> MotivationActivityPackages { get; set; }
        public virtual ICollection<PackageEvent> PackageEvents { get; set; }
        public virtual ICollection<PackageTestExam> PackageTestExams { get; set; }

    }
}
