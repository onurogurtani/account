﻿using System;
using System.Collections.Generic;
using TurkcellDigitalSchool.Account.Domain.Concrete.ReadOnly;
using TurkcellDigitalSchool.Core.DataAccess;
using TurkcellDigitalSchool.Core.Entities;
using TurkcellDigitalSchool.Core.Enums;

namespace TurkcellDigitalSchool.Account.Domain.Concrete
{
    public class Package : EntityDefault, IPublishEntity
    {
        public bool HasCoachService { get; set; }
        public bool HasTryingTest { get; set; }
        public int? TryingTestQuestionCount { get; set; }
        public bool HasMotivationEvent { get; set; }
        public PackageKind PackageKind { get; set; }
        public PackageTypeEnum PackageTypeEnum { get; set; }
        public ExamKind ExamKind { get; set; }

        public long EducationYearId { get; set; }
        public EducationYear EducationYear { get; set; }
        public string Name { get; set; }
        public string Summary { get; set; }
        public string Content { get; set; }

        public bool IsActive { get; set; }
        public bool IsMenuAccessSet { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime FinishDate { get; set; }
        public virtual ICollection<PackageLesson> PackageLessons { get; set; }
        public virtual ICollection<ImageOfPackage> ImageOfPackages { get; set; }
        public virtual ICollection<PackageRole> PackageRoles { get; set; }
        public virtual ICollection<PackagePublisher> PackagePublishers { get; set; }
        public virtual ICollection<PackageDocument> PackageDocuments { get; set; }
        public virtual ICollection<PackageContractType> PackageContractTypes { get; set; }

        public virtual ICollection<PackageFieldType> PackageFieldTypes { get; set; }
        public virtual ICollection<PackagePackageTypeEnum> PackagePackageTypeEnums { get; set; }  //TODO   silinecek
        public virtual ICollection<PackageTestExamPackage> TestExamPackages { get; set; }
        public virtual ICollection<PackageCoachServicePackage> CoachServicePackages { get; set; }
        public virtual ICollection<PackageMotivationActivityPackage> MotivationActivityPackages { get; set; }
        public virtual ICollection<PackageEvent> PackageEvents { get; set; }
        public virtual ICollection<PackageTestExam> PackageTestExams { get; set; }

    }
}
