using System;
using System.Linq;
using FluentValidation;
using TurkcellDigitalSchool.Account.Business.Handlers.Packages.Commands;
using TurkcellDigitalSchool.Common.Constants;
using TurkcellDigitalSchool.Common.Helpers;
using TurkcellDigitalSchool.Core.CustomAttribute;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Entities.Enums;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Packages.ValidationRules
{
    [MessageClassAttr("Paket Ekleme Do�rulay�c�s�")]
    public class CreatePackageValidator : AbstractValidator<CreatePackageCommand>
    {
        [MessageConstAttr(MessageCodeType.Error, "Paket Ad�,Ba�lang�� Tarihi,��erik,�zet,Yay�n,Ders,Paket Alan�,Evrak,Motivasyon Se�im")]
        private static string FieldIsNotNullOrEmpty = Messages.FieldIsNotNullOrEmpty;
        [MessageConstAttr(MessageCodeType.Error)]
        private static string CheckDates = Constants.Messages.CheckDates;
        [MessageConstAttr(MessageCodeType.Error, "1")]
        private static string MinImageOfPackage = Constants.Messages.MinImageOfPackage;
        [MessageConstAttr(MessageCodeType.Error, "5")]
        private static string MaxImageOfPackage = Constants.Messages.MaxImageOfPackage;
        [MessageConstAttr(MessageCodeType.Error)]
        private static string IsInEnumValue = Messages.IsInEnumValue;
        [MessageConstAttr(MessageCodeType.Error)]
        private static string MotivationIsNotExistCannotChoose = Constants.Messages.MotivationIsNotExistCannotChoose;
        [MessageConstAttr(MessageCodeType.Error)]
        private static string ShouldChooseMotivationEvent = Constants.Messages.ShouldChooseMotivationEvent;
        [MessageConstAttr(MessageCodeType.Error)]
        private static string MotivationTabsOnlyOneChoose = Constants.Messages.MotivationTabsOnlyOneChoose;
        [MessageConstAttr(MessageCodeType.Error)]
        private static string MotivationTabsHaveToChoose = Constants.Messages.MotivationTabsHaveToChoose;
        [MessageConstAttr(MessageCodeType.Error)]
        private static string TestExamIsNotExistCannotChoose = Constants.Messages.TestExamIsNotExistCannotChoose;
        [MessageConstAttr(MessageCodeType.Error)]
        private static string ShouldChooseTestExam = Constants.Messages.ShouldChooseTestExam;
        [MessageConstAttr(MessageCodeType.Error)]
        private static string TestExamTabsOnlyOneChoose = Constants.Messages.TestExamTabsOnlyOneChoose;
        [MessageConstAttr(MessageCodeType.Error)]
        private static string TestExamTabsHaveToChoose = Constants.Messages.TestExamTabsHaveToChoose;
        public CreatePackageValidator()
        {
            RuleFor(x => x.Package.Name).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Paket Ad�" }));
            RuleFor(x => x.Package.StartDate).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Ba�lang�� Tarihi" }))
                .GreaterThan(x => DateTime.Now).WithMessage(CheckDates.PrepareRedisMessage());
            RuleFor(x => x.Package.FinishDate).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Biti� Tarihi" }))
                .GreaterThan(x => x.Package.StartDate).WithMessage(CheckDates.PrepareRedisMessage());

            RuleFor(x => x.Package.Content).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "��erik" }));
            RuleFor(x => x.Package.Summary).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "�zet" }));

            RuleFor(x => x.Package.PackageKind).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Paket Tipi" }));
            RuleFor(x => x.Package.PackageKind).IsInEnum().WithMessage(IsInEnumValue.PrepareRedisMessage());

            RuleForEach(x => x.Package.PackagePackageTypeEnums).ChildRules(child =>
                {
                    child.RuleFor(x => x.PackageTypeEnum).IsInEnum().WithMessage(IsInEnumValue.PrepareRedisMessage());
                });

            RuleFor(x => x.Package.ImageOfPackages.Count)
                .LessThan(6).WithMessage(MaxImageOfPackage.PrepareRedisMessage(messageParameters: new object[] { "5" }))
                .GreaterThan(0).WithMessage(MinImageOfPackage.PrepareRedisMessage(messageParameters: new object[] { "1" }));

            RuleFor(x => x.Package.PackagePublishers).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Yay�n" }));
            RuleFor(x => x.Package.PackageLessons).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Ders" }));
            RuleFor(x => x.Package.PackageFieldTypes).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Paket Alan�" }));
            RuleFor(x => x.Package.PackageDocuments).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Evrak" }));
            RuleForEach(x => x.Package.PackageFieldTypes).ChildRules(child =>
            {
                child.RuleFor(x => x.FieldType).IsInEnum().WithMessage(IsInEnumValue.PrepareRedisMessage());
            });


            When(x => x.Package.HasCoachService, () =>
            {
                RuleFor(x => x.Package.PackageFieldTypes).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Motivasyon Se�im" }));
            });


            When(x => !x.Package.HasMotivationEvent, () =>
            {
                RuleFor(x => x.Package).Must(x =>
                          (x.PackageEvents?.Count == 0 && x.MotivationActivityPackages?.Count == 0))
                          .WithMessage(MotivationIsNotExistCannotChoose.PrepareRedisMessage());
            });


            When(x => x.Package.HasMotivationEvent, () =>
                {
                    // motivation se�ili
                    When(x => x.Package.PackagePackageTypeEnums.Any(s => s.PackageTypeEnum == PackageTypeEnum.MotivationEvent), () =>
                    {
                        RuleFor(x => x.Package.PackageEvents).NotEmpty().WithMessage(ShouldChooseMotivationEvent.PrepareRedisMessage());
                    });

                    // motivation se�ili de�il
                    When(x => x.Package.PackagePackageTypeEnums.All(s => s.PackageTypeEnum != PackageTypeEnum.MotivationEvent), () =>
                    {
                        RuleFor(x => x.Package).Must(x =>
                        (x.PackageEvents?.Count == 0 && x.MotivationActivityPackages?.Count == 0) ||
                        (x.PackageEvents?.Count > 0 && x.MotivationActivityPackages?.Count == 0) ||
                        (x.PackageEvents?.Count == 0 && x.MotivationActivityPackages?.Count > 0))
                        .WithMessage(MotivationTabsOnlyOneChoose.PrepareRedisMessage());

                        RuleFor(x => x.Package).Must(x => x.PackageEvents?.Count > 0 || x.MotivationActivityPackages?.Count > 0)
                       .WithMessage(MotivationTabsHaveToChoose.PrepareRedisMessage());
                    });

                });




            When(x => !x.Package.HasTryingTest, () =>
            {
                RuleFor(x => x.Package).Must(x => (x.PackageTestExams?.Count == 0 && x.TestExamPackages?.Count == 0))
                          .WithMessage(TestExamIsNotExistCannotChoose.PrepareRedisMessage());
            });

            When(x => x.Package.HasTryingTest, () =>
                {
                    // test exams se�ili
                    When(x => x.Package.PackagePackageTypeEnums.Any(s => s.PackageTypeEnum == PackageTypeEnum.TestExam), () =>
                    {
                        RuleFor(x => x.Package.PackageTestExams).NotEmpty().WithMessage(ShouldChooseTestExam.PrepareRedisMessage());
                    });

                    // test exams  se�ili de�il
                    When(x => x.Package.PackagePackageTypeEnums.All(s => s.PackageTypeEnum != PackageTypeEnum.TestExam), () =>
                    {
                        RuleFor(x => x.Package).Must(x =>
                        (x.PackageTestExams?.Count == 0 && x.TestExamPackages?.Count == 0) ||
                        (x.PackageTestExams?.Count > 0 && x.TestExamPackages?.Count == 0) ||
                        (x.PackageTestExams?.Count == 0 && x.TestExamPackages?.Count > 0))
                        .WithMessage(TestExamTabsOnlyOneChoose.PrepareRedisMessage());

                        RuleFor(x => x.Package).Must(x => x.PackageTestExams.Count > 0 || x.TestExamPackages.Count > 0)
                       .WithMessage(TestExamTabsHaveToChoose.PrepareRedisMessage());
                    });

                });

        }
    }

    [MessageClassAttr("Paket G�ncelleme Do�rulay�c�s�")]
    public class UpdatePackageValidator : AbstractValidator<UpdatePackageCommand>
    {
        [MessageConstAttr(MessageCodeType.Error, "Paket Ad�,Ba�lang�� Tarihi,��erik,�zet,Yay�n,Ders,Paket Alan�,Evrak,Motivasyon Se�im")]
        private static string FieldIsNotNullOrEmpty = Messages.FieldIsNotNullOrEmpty;
        [MessageConstAttr(MessageCodeType.Error)]
        private static string CheckDates = Constants.Messages.CheckDates;
        [MessageConstAttr(MessageCodeType.Error, "1")]
        private static string MinImageOfPackage = Constants.Messages.MinImageOfPackage;
        [MessageConstAttr(MessageCodeType.Error, "5")]
        private static string MaxImageOfPackage = Constants.Messages.MaxImageOfPackage;
        [MessageConstAttr(MessageCodeType.Error)]
        private static string IsInEnumValue = Messages.IsInEnumValue;
        [MessageConstAttr(MessageCodeType.Error)]
        private static string MotivationIsNotExistCannotChoose = Constants.Messages.MotivationIsNotExistCannotChoose;
        [MessageConstAttr(MessageCodeType.Error)]
        private static string ShouldChooseMotivationEvent = Constants.Messages.ShouldChooseMotivationEvent;
        [MessageConstAttr(MessageCodeType.Error)]
        private static string MotivationTabsOnlyOneChoose = Constants.Messages.MotivationTabsOnlyOneChoose;
        [MessageConstAttr(MessageCodeType.Error)]
        private static string MotivationTabsHaveToChoose = Constants.Messages.MotivationTabsHaveToChoose;
        [MessageConstAttr(MessageCodeType.Error)]
        private static string TestExamIsNotExistCannotChoose = Constants.Messages.TestExamIsNotExistCannotChoose;
        [MessageConstAttr(MessageCodeType.Error)]
        private static string ShouldChooseTestExam = Constants.Messages.ShouldChooseTestExam;
        [MessageConstAttr(MessageCodeType.Error)]
        private static string TestExamTabsOnlyOneChoose = Constants.Messages.TestExamTabsOnlyOneChoose;
        [MessageConstAttr(MessageCodeType.Error)]
        private static string TestExamTabsHaveToChoose = Constants.Messages.TestExamTabsHaveToChoose;
        public UpdatePackageValidator()
        {
            RuleFor(x => x.Package.Name).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Paket Ad�" }));
            RuleFor(x => x.Package.StartDate).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Ba�lang�� Tarihi" }))
                .GreaterThan(x => DateTime.Now).WithMessage(CheckDates.PrepareRedisMessage());
            RuleFor(x => x.Package.FinishDate).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Biti� Tarihi" }))
                .GreaterThan(x => x.Package.StartDate).WithMessage(CheckDates.PrepareRedisMessage());

            RuleFor(x => x.Package.Content).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "��erik" }));
            RuleFor(x => x.Package.Summary).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "�zet" }));

            RuleFor(x => x.Package.PackageKind).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Paket Tipi" }));
            RuleFor(x => x.Package.PackageKind).IsInEnum().WithMessage(IsInEnumValue.PrepareRedisMessage());

            RuleForEach(x => x.Package.PackagePackageTypeEnums).ChildRules(child =>
                {
                    child.RuleFor(x => x.PackageTypeEnum).IsInEnum().WithMessage(IsInEnumValue.PrepareRedisMessage());
                });

            RuleFor(x => x.Package.ImageOfPackages.Count)
                .LessThan(6).WithMessage(MaxImageOfPackage.PrepareRedisMessage(messageParameters: new object[] { "5" }))
                .GreaterThan(0).WithMessage(MinImageOfPackage.PrepareRedisMessage(messageParameters: new object[] { "1" }));

            RuleFor(x => x.Package.PackagePublishers).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Yay�n" }));
            RuleFor(x => x.Package.PackageLessons).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Ders" }));
            RuleFor(x => x.Package.PackageFieldTypes).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Paket Alan�" }));
            RuleFor(x => x.Package.PackageDocuments).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Evrak" }));
            RuleForEach(x => x.Package.PackageFieldTypes).ChildRules(child =>
            {
                child.RuleFor(x => x.FieldType).IsInEnum().WithMessage(IsInEnumValue.PrepareRedisMessage());
            });


            When(x => x.Package.HasCoachService, () =>
            {
                RuleFor(x => x.Package.PackageFieldTypes).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Motivasyon Se�im" }));
            });


            When(x => !x.Package.HasMotivationEvent, () =>
            {
                RuleFor(x => x.Package).Must(x =>
                          (x.PackageEvents?.Count == 0 && x.MotivationActivityPackages?.Count == 0))
                          .WithMessage(MotivationIsNotExistCannotChoose.PrepareRedisMessage());
            });


            When(x => x.Package.HasMotivationEvent, () =>
                {
                    // motivation se�ili
                    When(x => x.Package.PackagePackageTypeEnums.Any(s => s.PackageTypeEnum == PackageTypeEnum.MotivationEvent), () =>
                    {
                        RuleFor(x => x.Package.PackageEvents).NotEmpty().WithMessage(ShouldChooseMotivationEvent.PrepareRedisMessage());
                    });

                    // motivation se�ili de�il
                    When(x => x.Package.PackagePackageTypeEnums.All(s => s.PackageTypeEnum != PackageTypeEnum.MotivationEvent), () =>
                    {
                        RuleFor(x => x.Package).Must(x =>
                        (x.PackageEvents?.Count == 0 && x.MotivationActivityPackages?.Count == 0) ||
                        (x.PackageEvents?.Count > 0 && x.MotivationActivityPackages?.Count == 0) ||
                        (x.PackageEvents?.Count == 0 && x.MotivationActivityPackages?.Count > 0))
                        .WithMessage(MotivationTabsOnlyOneChoose.PrepareRedisMessage());

                        RuleFor(x => x.Package).Must(x => x.PackageEvents?.Count > 0 || x.MotivationActivityPackages?.Count > 0)
                       .WithMessage(MotivationTabsHaveToChoose.PrepareRedisMessage());
                    });

                });




            When(x => !x.Package.HasTryingTest, () =>
            {
                RuleFor(x => x.Package).Must(x => (x.PackageTestExams?.Count == 0 && x.TestExamPackages?.Count == 0))
                          .WithMessage(TestExamIsNotExistCannotChoose.PrepareRedisMessage());
            });

            When(x => x.Package.HasTryingTest, () =>
                {
                    // test exams se�ili
                    When(x => x.Package.PackagePackageTypeEnums.Any(s => s.PackageTypeEnum == PackageTypeEnum.TestExam), () =>
                    {
                        RuleFor(x => x.Package.PackageTestExams).NotEmpty().WithMessage(ShouldChooseTestExam.PrepareRedisMessage());
                    });

                    // test exams  se�ili de�il
                    When(x => x.Package.PackagePackageTypeEnums.All(s => s.PackageTypeEnum != PackageTypeEnum.TestExam), () =>
                    {
                        RuleFor(x => x.Package).Must(x =>
                        (x.PackageTestExams?.Count == 0 && x.TestExamPackages?.Count == 0) ||
                        (x.PackageTestExams?.Count > 0 && x.TestExamPackages?.Count == 0) ||
                        (x.PackageTestExams?.Count == 0 && x.TestExamPackages?.Count > 0))
                        .WithMessage(TestExamTabsOnlyOneChoose.PrepareRedisMessage());

                        RuleFor(x => x.Package).Must(x => x.PackageTestExams.Count > 0 || x.TestExamPackages.Count > 0)
                       .WithMessage(TestExamTabsHaveToChoose.PrepareRedisMessage());
                    });

                });
        }

    }

    [MessageClassAttr("Paket Silme Do�rulay�c�s�")]
    public class DeletePackageValidator : AbstractValidator<DeletePackageCommand>
    {
        [MessageConstAttr(MessageCodeType.Error, "Id")]
        private static string FieldIsNotNullOrEmpty = Messages.FieldIsNotNullOrEmpty;
        public DeletePackageValidator()
        {
            RuleFor(x => x.Id).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Id" }));
        }
    }
}