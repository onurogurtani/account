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
            RuleFor(x => x.Package.Name).NotEmpty().WithMessage(string.Format(Messages.FieldIsNotNullOrEmpty, "Paket Adý"));
            RuleFor(x => x.Package.StartDate).NotEmpty().WithMessage(string.Format(Messages.FieldIsNotNullOrEmpty, "Baþlangýç Tarihi"))
                .GreaterThan(x => DateTime.Now).WithMessage("Lütfen girilen tarihleri kontrol ediniz.");
            RuleFor(x => x.Package.FinishDate).NotEmpty().WithMessage(string.Format(Messages.FieldIsNotNullOrEmpty, "Bitiþ Tarihi"))
                .GreaterThan(x => x.Package.StartDate).WithMessage("Lütfen girilen tarihleri kontrol ediniz.");

            RuleFor(x => x.Package.Content).NotEmpty().WithMessage(string.Format(Messages.FieldIsNotNullOrEmpty, "Ýçerik"));
            RuleFor(x => x.Package.Summary).NotEmpty().WithMessage(string.Format(Messages.FieldIsNotNullOrEmpty, "Özet"));

            RuleFor(x => x.Package.PackageKind).NotEmpty().WithMessage(string.Format(Messages.FieldIsNotNullOrEmpty, "Paket Tipi"));
            RuleFor(x => x.Package.PackageKind).IsInEnum().WithMessage("Paket Tipi Geçersiz!");

            RuleForEach(x => x.Package.PackagePackageTypeEnums).ChildRules(child =>
                {
                    child.RuleFor(x => x.PackageTypeEnum).IsInEnum().WithMessage("Paket Türü Geçersiz!");
                });

            RuleFor(x => x.Package.ImageOfPackages.Count)
                .LessThan(6).WithMessage("En fazla 5 Paket Görseli eklenebilir.")
                .GreaterThan(0).WithMessage("En az 1 Paket Görseli eklenmeli.");

            RuleFor(x => x.Package.PackagePublishers).NotEmpty().WithMessage(string.Format(Messages.FieldIsNotNullOrEmpty, "Yayýn"));
            RuleFor(x => x.Package.PackageLessons).NotEmpty().WithMessage(string.Format(Messages.FieldIsNotNullOrEmpty, "Ders"));
            RuleFor(x => x.Package.PackageFieldTypes).NotEmpty().WithMessage(string.Format(Messages.FieldIsNotNullOrEmpty, "Paket Alaný"));
            RuleFor(x => x.Package.PackageDocuments).NotEmpty().WithMessage(string.Format(Messages.FieldIsNotNullOrEmpty, "Evrak"));
            RuleForEach(x => x.Package.PackageFieldTypes).ChildRules(child =>
            {
                child.RuleFor(x => x.FieldType).IsInEnum().WithMessage("Paket Alanlarý Geçersiz.");
            });


            When(x => x.Package.HasCoachService, () =>
                {
                    //RuleFor(p => p.Package.CoachServicePackages).NotEmpty().WithMessage("Lütfen zorunlu alanlarý doldurunuz.");
                });


            When(x => !x.Package.HasMotivationEvent, () =>
            {
                RuleFor(x => x.Package).Must(x =>
                          (x.PackageEvents?.Count == 0 && x.MotivationActivityPackages?.Count == 0))
                          .WithMessage("Motivasyon Yoktur ise  motivasyon ile ilgili seçimler yapýlamaz");
            });


            When(x => x.Package.HasMotivationEvent, () =>
                {
                    // motivation seçili
                    When(x => x.Package.PackagePackageTypeEnums.Any(s => s.PackageTypeEnum == PackageTypeEnum.MotivationEvent), () =>
                    {
                        RuleFor(x => x.Package.PackageEvents).NotEmpty().WithMessage("Motivasyon etkinliði seçim yapanýz gerekmektedir");
                    });

                    // motivation seçili deðil
                    When(x => x.Package.PackagePackageTypeEnums.All(s => s.PackageTypeEnum != PackageTypeEnum.MotivationEvent), () =>
                    {
                        RuleFor(x => x.Package).Must(x =>
                        (x.PackageEvents?.Count == 0 && x.MotivationActivityPackages?.Count == 0) ||
                        (x.PackageEvents?.Count > 0 && x.MotivationActivityPackages?.Count == 0) ||
                        (x.PackageEvents?.Count == 0 && x.MotivationActivityPackages?.Count > 0))
                        .WithMessage("Motivasyon sekmelerden sadece seçtiðiniz bir tanesi üzerinde seçim yapabilirsiniz");

                        RuleFor(x => x.Package).Must(x => x.PackageEvents?.Count > 0 || x.MotivationActivityPackages?.Count > 0)
                       .WithMessage(" Motivasyon  sekmelerden  seçtiðiniz bir tanesi üzerinde seçim yapanýz gerekmektedir");
                    });

                });




            When(x => !x.Package.HasTryingTest, () =>
            {
                RuleFor(x => x.Package).Must(x => (x.PackageTestExams?.Count == 0 && x.TestExamPackages?.Count == 0))
                          .WithMessage("Deneme Sýnavý Yoktur ise  deneme sýnavý ile ilgili seçimler yapýlamaz");
            });

            When(x => x.Package.HasTryingTest, () =>
                {
                    // test exams seçili
                    When(x => x.Package.PackagePackageTypeEnums.Any(s => s.PackageTypeEnum == PackageTypeEnum.TestExam), () =>
                    {
                        RuleFor(x => x.Package.PackageTestExams).NotEmpty().WithMessage("Deneme Sýnavý seçim yapanýz gerekmektedir");
                    });

                    // test exams  seçili deðil
                    When(x => x.Package.PackagePackageTypeEnums.All(s => s.PackageTypeEnum != PackageTypeEnum.TestExam), () =>
                    {
                        RuleFor(x => x.Package).Must(x =>
                        (x.PackageTestExams?.Count == 0 && x.TestExamPackages?.Count == 0) ||
                        (x.PackageTestExams?.Count > 0 && x.TestExamPackages?.Count == 0) ||
                        (x.PackageTestExams?.Count == 0 && x.TestExamPackages?.Count > 0))
                        .WithMessage("Deneme Sýnavý  sekmelerden sadece seçtiðiniz bir tanesi üzerinde seçim yapabilirsiniz");

                        RuleFor(x => x.Package).Must(x => x.PackageTestExams.Count > 0 || x.TestExamPackages.Count > 0)
                       .WithMessage("Deneme Sýnavý sekmelerden  seçtiðiniz bir tanesi üzerinde seçim yapanýz gerekmektedir");
                    });

                });

        }
    }

    public class UpdatePackageValidator : AbstractValidator<UpdatePackageCommand>
    {
        public UpdatePackageValidator()
        {
            RuleFor(x => x.Package.Id).NotEmpty().WithMessage(string.Format(Messages.FieldIsNotNullOrEmpty, "Paket Id"));
            RuleFor(x => x.Package.Name).NotEmpty().WithMessage(string.Format(Messages.FieldIsNotNullOrEmpty, "Paket Adý"));
            RuleFor(x => x.Package.StartDate).NotEmpty().WithMessage(string.Format(Messages.FieldIsNotNullOrEmpty, "Baþlangýç Tarihi"))
                .GreaterThan(x => DateTime.Now).WithMessage("Lütfen girilen tarihleri kontrol ediniz.");
            RuleFor(x => x.Package.FinishDate).NotEmpty().WithMessage(string.Format(Messages.FieldIsNotNullOrEmpty, "Bitiþ Tarihi"))
                .GreaterThan(x => x.Package.StartDate).WithMessage("Lütfen girilen tarihleri kontrol ediniz.");

            RuleFor(x => x.Package.Content).NotEmpty().WithMessage(string.Format(Messages.FieldIsNotNullOrEmpty, "Ýçerik"));
            RuleFor(x => x.Package.Summary).NotEmpty().WithMessage(string.Format(Messages.FieldIsNotNullOrEmpty, "Özet"));

            RuleFor(x => x.Package.PackageKind).NotEmpty().WithMessage(string.Format(Messages.FieldIsNotNullOrEmpty, "Paket Tipi"));
            RuleFor(x => x.Package.PackageKind).IsInEnum().WithMessage("Paket Tipi Geçersiz!");

            RuleForEach(x => x.Package.PackagePackageTypeEnums).ChildRules(child =>
            {
                child.RuleFor(x => x.PackageTypeEnum).IsInEnum().WithMessage("Paket Türü Geçersiz!");
            });

            RuleFor(x => x.Package.ImageOfPackages.Count)
                .LessThan(6).WithMessage("En fazla 5 Paket Görseli eklenebilir.")
                .GreaterThan(0).WithMessage("En az 1 Paket Görseli eklenmeli.");

            RuleFor(x => x.Package.PackagePublishers).NotEmpty().WithMessage(string.Format(Messages.FieldIsNotNullOrEmpty, "Yayýn"));
            RuleFor(x => x.Package.PackageLessons).NotEmpty().WithMessage(string.Format(Messages.FieldIsNotNullOrEmpty, "Ders"));
            RuleFor(x => x.Package.PackageFieldTypes).NotEmpty().WithMessage(string.Format(Messages.FieldIsNotNullOrEmpty, "Paket Alaný"));
            RuleFor(x => x.Package.PackageDocuments).NotEmpty().WithMessage(string.Format(Messages.FieldIsNotNullOrEmpty, "Evrak"));
            RuleForEach(x => x.Package.PackageFieldTypes).ChildRules(child =>
            {
                child.RuleFor(x => x.FieldType).IsInEnum().WithMessage("Paket Alanlarý Geçersiz.");
            });


            When(x => x.Package.HasCoachService, () =>
            {
                //RuleFor(p => p.Package.CoachServicePackages).NotEmpty().WithMessage("Lütfen zorunlu alanlarý doldurunuz.");
            });


            When(x => !x.Package.HasMotivationEvent, () =>
            {
                RuleFor(x => x.Package).Must(x =>
                          (x.PackageEvents?.Count == 0 && x.MotivationActivityPackages?.Count == 0))
                          .WithMessage("Motivasyon Yoktur ise  motivasyon ile ilgili seçimler yapýlamaz");
            });


            When(x => x.Package.HasMotivationEvent, () =>
            {
                // motivation seçili
                When(x => x.Package.PackagePackageTypeEnums.Any(s => s.PackageTypeEnum == PackageTypeEnum.MotivationEvent), () =>
                {
                    RuleFor(x => x.Package.PackageEvents).NotEmpty().WithMessage("Motivasyon etkinliði seçim yapanýz gerekmektedir");
                });

                // motivation seçili deðil
                When(x => x.Package.PackagePackageTypeEnums.All(s => s.PackageTypeEnum != PackageTypeEnum.MotivationEvent), () =>
                {
                    RuleFor(x => x.Package).Must(x =>
                    (x.PackageEvents?.Count == 0 && x.MotivationActivityPackages?.Count == 0) ||
                    (x.PackageEvents?.Count > 0 && x.MotivationActivityPackages?.Count == 0) ||
                    (x.PackageEvents?.Count == 0 && x.MotivationActivityPackages?.Count > 0))
                    .WithMessage("Motivasyon sekmelerden sadece seçtiðiniz bir tanesi üzerinde seçim yapabilirsiniz");

                    RuleFor(x => x.Package).Must(x => x.PackageEvents?.Count > 0 || x.MotivationActivityPackages?.Count > 0)
                   .WithMessage(" Motivasyon  sekmelerden  seçtiðiniz bir tanesi üzerinde seçim yapanýz gerekmektedir");
                });

            });




            When(x => !x.Package.HasTryingTest, () =>
            {
                RuleFor(x => x.Package).Must(x => (x.PackageTestExams?.Count == 0 && x.TestExamPackages?.Count == 0))
                          .WithMessage("Deneme Sýnavý Yoktur ise  deneme sýnavý ile ilgili seçimler yapýlamaz");
            });

            When(x => x.Package.HasTryingTest, () =>
            {
                // test exams seçili
                When(x => x.Package.PackagePackageTypeEnums.Any(s => s.PackageTypeEnum == PackageTypeEnum.TestExam), () =>
                {
                    RuleFor(x => x.Package.PackageTestExams).NotEmpty().WithMessage("Deneme Sýnavý seçim yapanýz gerekmektedir");
                });

                // test exams  seçili deðil
                When(x => x.Package.PackagePackageTypeEnums.All(s => s.PackageTypeEnum != PackageTypeEnum.TestExam), () =>
                {
                    RuleFor(x => x.Package).Must(x =>
                    (x.PackageTestExams?.Count == 0 && x.TestExamPackages?.Count == 0) ||
                    (x.PackageTestExams?.Count > 0 && x.TestExamPackages?.Count == 0) ||
                    (x.PackageTestExams?.Count == 0 && x.TestExamPackages?.Count > 0))
                    .WithMessage("Deneme Sýnavý  sekmelerden sadece seçtiðiniz bir tanesi üzerinde seçim yapabilirsiniz");

                    RuleFor(x => x.Package).Must(x => x.PackageTestExams.Count > 0 || x.TestExamPackages.Count > 0)
                   .WithMessage("Deneme Sýnavý sekmelerden  seçtiðiniz bir tanesi üzerinde seçim yapanýz gerekmektedir");
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