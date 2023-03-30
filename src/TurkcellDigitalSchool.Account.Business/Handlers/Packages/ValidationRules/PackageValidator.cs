using System;
using System.Linq;
using FluentValidation;
using TurkcellDigitalSchool.Account.Business.Handlers.Packages.Commands;
using TurkcellDigitalSchool.Common.Constants;
using TurkcellDigitalSchool.Entities.Enums;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Packages.ValidationRules
{

    public class CreatePackageValidator : AbstractValidator<CreatePackageCommand>
    {
        public CreatePackageValidator()
        {
            RuleFor(x => x.Package.Name).NotEmpty().WithMessage(string.Format(Messages.FieldIsNotNullOrEmpty, "Paket Ad�"));
            RuleFor(x => x.Package.StartDate).NotEmpty().WithMessage(string.Format(Messages.FieldIsNotNullOrEmpty, "Ba�lang�� Tarihi"))
                .GreaterThan(x => DateTime.Now).WithMessage("L�tfen girilen tarihleri kontrol ediniz.");
            RuleFor(x => x.Package.FinishDate).NotEmpty().WithMessage(string.Format(Messages.FieldIsNotNullOrEmpty, "Biti� Tarihi"))
                .GreaterThan(x => x.Package.StartDate).WithMessage("L�tfen girilen tarihleri kontrol ediniz.");

            RuleFor(x => x.Package.Content).NotEmpty().WithMessage(string.Format(Messages.FieldIsNotNullOrEmpty, "��erik"));
            RuleFor(x => x.Package.Summary).NotEmpty().WithMessage(string.Format(Messages.FieldIsNotNullOrEmpty, "�zet"));

            RuleFor(x => x.Package.PackageKind).NotEmpty().WithMessage(string.Format(Messages.FieldIsNotNullOrEmpty, "Paket Tipi"));
            RuleFor(x => x.Package.PackageKind).IsInEnum().WithMessage("Paket Tipi Ge�ersiz!");

            RuleForEach(x => x.Package.PackagePackageTypeEnums).ChildRules(child =>
                {
                    child.RuleFor(x => x.PackageTypeEnum).IsInEnum().WithMessage("Paket T�r� Ge�ersiz!");
                });

            RuleFor(x => x.Package.ImageOfPackages.Count)
                .LessThan(6).WithMessage("En fazla 5 Paket G�rseli eklenebilir.")
                .GreaterThan(0).WithMessage("En az 1 Paket G�rseli eklenmeli.");

            RuleFor(x => x.Package.PackagePublishers).NotEmpty().WithMessage(string.Format(Messages.FieldIsNotNullOrEmpty, "Yay�n"));
            RuleFor(x => x.Package.PackageLessons).NotEmpty().WithMessage(string.Format(Messages.FieldIsNotNullOrEmpty, "Ders"));
            RuleFor(x => x.Package.PackageFieldTypes).NotEmpty().WithMessage(string.Format(Messages.FieldIsNotNullOrEmpty, "Paket Alan�"));
            RuleFor(x => x.Package.PackageDocuments).NotEmpty().WithMessage(string.Format(Messages.FieldIsNotNullOrEmpty, "Evrak"));
            RuleForEach(x => x.Package.PackageFieldTypes).ChildRules(child =>
            {
                child.RuleFor(x => x.FieldType).IsInEnum().WithMessage("Paket Alanlar� Ge�ersiz.");
            });


            When(x => x.Package.HasCoachService, () =>
            {
                RuleFor(x => x.Package.PackageFieldTypes).NotEmpty().WithMessage(string.Format(Messages.FieldIsNotNullOrEmpty, "Motivasyon Se�im "));
            });


            When(x => !x.Package.HasMotivationEvent, () =>
            {
                RuleFor(x => x.Package).Must(x =>
                          (x.PackageEvents?.Count == 0 && x.MotivationActivityPackages?.Count == 0))
                          .WithMessage("Motivasyon Yoktur ise  motivasyon ile ilgili se�imler yap�lamaz");
            });


            When(x => x.Package.HasMotivationEvent, () =>
                {
                    // motivation se�ili
                    When(x => x.Package.PackagePackageTypeEnums.Any(s => s.PackageTypeEnum == PackageTypeEnum.MotivationEvent), () =>
                    {
                        RuleFor(x => x.Package.PackageEvents).NotEmpty().WithMessage("Motivasyon etkinli�i se�im yapan�z gerekmektedir");
                    });

                    // motivation se�ili de�il
                    When(x => x.Package.PackagePackageTypeEnums.All(s => s.PackageTypeEnum != PackageTypeEnum.MotivationEvent), () =>
                    {
                        RuleFor(x => x.Package).Must(x =>
                        (x.PackageEvents?.Count == 0 && x.MotivationActivityPackages?.Count == 0) ||
                        (x.PackageEvents?.Count > 0 && x.MotivationActivityPackages?.Count == 0) ||
                        (x.PackageEvents?.Count == 0 && x.MotivationActivityPackages?.Count > 0))
                        .WithMessage("Motivasyon sekmelerden sadece se�ti�iniz bir tanesi �zerinde se�im yapabilirsiniz");

                        RuleFor(x => x.Package).Must(x => x.PackageEvents?.Count > 0 || x.MotivationActivityPackages?.Count > 0)
                       .WithMessage(" Motivasyon  sekmelerden  se�ti�iniz bir tanesi �zerinde se�im yapan�z gerekmektedir");
                    });

                });




            When(x => !x.Package.HasTryingTest, () =>
            {
                RuleFor(x => x.Package).Must(x => (x.PackageTestExams?.Count == 0 && x.TestExamPackages?.Count == 0))
                          .WithMessage("Deneme S�nav� Yoktur ise  deneme s�nav� ile ilgili se�imler yap�lamaz");
            });

            When(x => x.Package.HasTryingTest, () =>
                {
                    // test exams se�ili
                    When(x => x.Package.PackagePackageTypeEnums.Any(s => s.PackageTypeEnum == PackageTypeEnum.TestExam), () =>
                    {
                        RuleFor(x => x.Package.PackageTestExams).NotEmpty().WithMessage("Deneme S�nav� se�im yapan�z gerekmektedir");
                    });

                    // test exams  se�ili de�il
                    When(x => x.Package.PackagePackageTypeEnums.All(s => s.PackageTypeEnum != PackageTypeEnum.TestExam), () =>
                    {
                        RuleFor(x => x.Package).Must(x =>
                        (x.PackageTestExams?.Count == 0 && x.TestExamPackages?.Count == 0) ||
                        (x.PackageTestExams?.Count > 0 && x.TestExamPackages?.Count == 0) ||
                        (x.PackageTestExams?.Count == 0 && x.TestExamPackages?.Count > 0))
                        .WithMessage("Deneme S�nav�  sekmelerden sadece se�ti�iniz bir tanesi �zerinde se�im yapabilirsiniz");

                        RuleFor(x => x.Package).Must(x => x.PackageTestExams.Count > 0 || x.TestExamPackages.Count > 0)
                       .WithMessage("Deneme S�nav� sekmelerden  se�ti�iniz bir tanesi �zerinde se�im yapan�z gerekmektedir");
                    });

                });

        }
    }

    public class UpdatePackageValidator : AbstractValidator<UpdatePackageCommand>
    {
        public UpdatePackageValidator()
        {
            RuleFor(x => x.Package.Id).NotEmpty().WithMessage(string.Format(Messages.FieldIsNotNullOrEmpty, "Paket Id"));
            RuleFor(x => x.Package.Name).NotEmpty().WithMessage(string.Format(Messages.FieldIsNotNullOrEmpty, "Paket Ad�"));
            RuleFor(x => x.Package.StartDate).NotEmpty().WithMessage(string.Format(Messages.FieldIsNotNullOrEmpty, "Ba�lang�� Tarihi"))
                .GreaterThan(x => DateTime.Now).WithMessage("L�tfen girilen tarihleri kontrol ediniz.");
            RuleFor(x => x.Package.FinishDate).NotEmpty().WithMessage(string.Format(Messages.FieldIsNotNullOrEmpty, "Biti� Tarihi"))
                .GreaterThan(x => x.Package.StartDate).WithMessage("L�tfen girilen tarihleri kontrol ediniz.");

            RuleFor(x => x.Package.Content).NotEmpty().WithMessage(string.Format(Messages.FieldIsNotNullOrEmpty, "��erik"));
            RuleFor(x => x.Package.Summary).NotEmpty().WithMessage(string.Format(Messages.FieldIsNotNullOrEmpty, "�zet"));

            RuleFor(x => x.Package.PackageKind).NotEmpty().WithMessage(string.Format(Messages.FieldIsNotNullOrEmpty, "Paket Tipi"));
            RuleFor(x => x.Package.PackageKind).IsInEnum().WithMessage("Paket Tipi Ge�ersiz!");

            RuleForEach(x => x.Package.PackagePackageTypeEnums).ChildRules(child =>
            {
                child.RuleFor(x => x.PackageTypeEnum).IsInEnum().WithMessage("Paket T�r� Ge�ersiz!");
            });

            RuleFor(x => x.Package.ImageOfPackages.Count)
                .LessThan(6).WithMessage("En fazla 5 Paket G�rseli eklenebilir.")
                .GreaterThan(0).WithMessage("En az 1 Paket G�rseli eklenmeli.");

            RuleFor(x => x.Package.PackagePublishers).NotEmpty().WithMessage(string.Format(Messages.FieldIsNotNullOrEmpty, "Yay�n"));
            RuleFor(x => x.Package.PackageLessons).NotEmpty().WithMessage(string.Format(Messages.FieldIsNotNullOrEmpty, "Ders"));
            RuleFor(x => x.Package.PackageFieldTypes).NotEmpty().WithMessage(string.Format(Messages.FieldIsNotNullOrEmpty, "Paket Alan�"));
            RuleFor(x => x.Package.PackageDocuments).NotEmpty().WithMessage(string.Format(Messages.FieldIsNotNullOrEmpty, "Evrak"));
            RuleForEach(x => x.Package.PackageFieldTypes).ChildRules(child =>
            {
                child.RuleFor(x => x.FieldType).IsInEnum().WithMessage("Paket Alanlar� Ge�ersiz.");
            });


            When(x => x.Package.HasCoachService, () =>
            {
                RuleFor(x => x.Package.PackageFieldTypes).NotEmpty().WithMessage(string.Format(Messages.FieldIsNotNullOrEmpty, "Motivasyon Se�im "));
            });

            When(x => !x.Package.HasMotivationEvent, () =>
            {
                RuleFor(x => x.Package).Must(x =>
                          (x.PackageEvents?.Count == 0 && x.MotivationActivityPackages?.Count == 0))
                          .WithMessage("Motivasyon Yoktur ise  motivasyon ile ilgili se�imler yap�lamaz");
            });


            When(x => x.Package.HasMotivationEvent, () =>
            {
                // motivation se�ili
                When(x => x.Package.PackagePackageTypeEnums.Any(s => s.PackageTypeEnum == PackageTypeEnum.MotivationEvent), () =>
                {
                    RuleFor(x => x.Package.PackageEvents).NotEmpty().WithMessage("Motivasyon etkinli�i se�im yapan�z gerekmektedir");
                });

                // motivation se�ili de�il
                When(x => x.Package.PackagePackageTypeEnums.All(s => s.PackageTypeEnum != PackageTypeEnum.MotivationEvent), () =>
                {
                    RuleFor(x => x.Package).Must(x =>
                    (x.PackageEvents?.Count == 0 && x.MotivationActivityPackages?.Count == 0) ||
                    (x.PackageEvents?.Count > 0 && x.MotivationActivityPackages?.Count == 0) ||
                    (x.PackageEvents?.Count == 0 && x.MotivationActivityPackages?.Count > 0))
                    .WithMessage("Motivasyon sekmelerden sadece se�ti�iniz bir tanesi �zerinde se�im yapabilirsiniz");

                    RuleFor(x => x.Package).Must(x => x.PackageEvents?.Count > 0 || x.MotivationActivityPackages?.Count > 0)
                   .WithMessage(" Motivasyon  sekmelerden  se�ti�iniz bir tanesi �zerinde se�im yapan�z gerekmektedir");
                });

            });




            When(x => !x.Package.HasTryingTest, () =>
            {
                RuleFor(x => x.Package).Must(x => (x.PackageTestExams?.Count == 0 && x.TestExamPackages?.Count == 0))
                          .WithMessage("Deneme S�nav� Yoktur ise  deneme s�nav� ile ilgili se�imler yap�lamaz");
            });

            When(x => x.Package.HasTryingTest, () =>
            {
                // test exams se�ili
                When(x => x.Package.PackagePackageTypeEnums.Any(s => s.PackageTypeEnum == PackageTypeEnum.TestExam), () =>
                {
                    RuleFor(x => x.Package.PackageTestExams).NotEmpty().WithMessage("Deneme S�nav� se�im yapan�z gerekmektedir");
                });

                // test exams  se�ili de�il
                When(x => x.Package.PackagePackageTypeEnums.All(s => s.PackageTypeEnum != PackageTypeEnum.TestExam), () =>
                {
                    RuleFor(x => x.Package).Must(x =>
                    (x.PackageTestExams?.Count == 0 && x.TestExamPackages?.Count == 0) ||
                    (x.PackageTestExams?.Count > 0 && x.TestExamPackages?.Count == 0) ||
                    (x.PackageTestExams?.Count == 0 && x.TestExamPackages?.Count > 0))
                    .WithMessage("Deneme S�nav�  sekmelerden sadece se�ti�iniz bir tanesi �zerinde se�im yapabilirsiniz");

                    RuleFor(x => x.Package).Must(x => x.PackageTestExams.Count > 0 || x.TestExamPackages.Count > 0)
                   .WithMessage("Deneme S�nav� sekmelerden  se�ti�iniz bir tanesi �zerinde se�im yapan�z gerekmektedir");
                });

            });

        }
    }

    public class DeletePackageValidator : AbstractValidator<DeletePackageCommand>
    {
        public DeletePackageValidator()
        {
            RuleFor(x => x.Id).NotEmpty();
        }
    }
}