using System;
using FluentValidation;
using TurkcellDigitalSchool.Account.Business.Handlers.Packages.Commands;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Packages.ValidationRules
{

    public class CreatePackageValidator : AbstractValidator<CreatePackageCommand>
    {
        public CreatePackageValidator()
        {
            RuleFor(x => x.Package.Name).NotEmpty().WithMessage("Lütfen zorunlu alanlarý doldurunuz.");

            RuleFor(x => x.Package.StartDate).NotEmpty().WithMessage("Lütfen zorunlu alanlarý doldurunuz.")
                .GreaterThan(x => DateTime.Now).WithMessage("Lütfen girilen tarihleri kontrol ediniz.");
            RuleFor(x => x.Package.FinishDate).NotEmpty().WithMessage("Lütfen zorunlu alanlarý doldurunuz.")
                .GreaterThan(x => x.Package.StartDate).WithMessage("Lütfen girilen tarihleri kontrol ediniz.");

            RuleFor(x => x.Package.Content).NotEmpty().WithMessage("Lütfen zorunlu alanlarý doldurunuz.");
            RuleFor(x => x.Package.Summary).NotEmpty().WithMessage("Lütfen zorunlu alanlarý doldurunuz.");

            RuleFor(x => x.Package.PackageKind).NotEmpty().WithMessage("Lütfen zorunlu alanlarý doldurunuz.");
            RuleFor(x => x.Package.PackageKind).IsInEnum().WithMessage("Paket Tipi Geçersiz!");

            RuleForEach(x => x.Package.PackagePackageTypeEnums).ChildRules(child =>
                {
                    child.RuleFor(x => x.PackageTypeEnum).IsInEnum().WithMessage("Paket Türü Geçersiz!");
                });


            RuleFor(x => x.Package.ImageOfPackages.Count)
                .LessThan(6).WithMessage("En fazla 5 Paket Görseli eklenebilir.")
                .GreaterThan(0).WithMessage("En az 1 Paket Görseli eklenmeli.");

            When(x => x.Package.HasCoachService, () =>
                {
                    RuleFor(p => p.Package.CoachServicePackages).NotEmpty().WithMessage("Lütfen zorunlu alanlarý doldurunuz.");
                });

            When(x => x.Package.HasMotivationEvent, () =>
                {
                    RuleFor(p => p.Package.MotivationActivityPackages).NotEmpty().WithMessage("Lütfen zorunlu alanlarý doldurunuz.");
                });

            When(x => x.Package.HasTryingTest, () =>
                {
                    RuleFor(p => p.Package.TestExamPackages).NotEmpty().WithMessage("Lütfen zorunlu alanlarý doldurunuz.");
                });

            RuleFor(x => x.Package.IsActive).NotEmpty().WithMessage("Lütfen zorunlu alanlarý doldurunuz.");
            RuleFor(x => x.Package.PackagePublishers).NotEmpty().WithMessage("Lütfen zorunlu alanlarý doldurunuz.");
            RuleFor(x => x.Package.PackageLessons).NotEmpty().WithMessage("Lütfen zorunlu alanlarý doldurunuz.");
            RuleFor(x => x.Package.PackageFieldTypes).NotEmpty().WithMessage("Lütfen zorunlu alanlarý doldurunuz.");
            RuleFor(x => x.Package.PackageDocuments).NotEmpty().WithMessage("Lütfen zorunlu alanlarý doldurunuz.");
            RuleForEach(x => x.Package.PackageFieldTypes).ChildRules(child =>
                {
                    child.RuleFor(x => x.FieldType).IsInEnum().WithMessage("Paket Alanlarý Geçersiz.");
                });
        }
    }

    public class UpdatePackageValidator : AbstractValidator<UpdatePackageCommand>
    {
        public UpdatePackageValidator()
        {
            RuleFor(x => x.Package.Id).NotEmpty().WithMessage("Lütfen zorunlu alanlarý doldurunuz.");
            RuleFor(x => x.Package.Name).NotEmpty().WithMessage("Lütfen zorunlu alanlarý doldurunuz.");

            RuleFor(x => x.Package.StartDate).NotEmpty().WithMessage("Lütfen zorunlu alanlarý doldurunuz.")
                .GreaterThan(x => DateTime.Now).WithMessage("Lütfen girilen tarihleri kontrol ediniz.");
            RuleFor(x => x.Package.FinishDate).NotEmpty().WithMessage("Lütfen zorunlu alanlarý doldurunuz.")
                .GreaterThan(x => x.Package.StartDate).WithMessage("Lütfen girilen tarihleri kontrol ediniz.");

            RuleFor(x => x.Package.Content).NotEmpty().WithMessage("Lütfen zorunlu alanlarý doldurunuz.");
            RuleFor(x => x.Package.Summary).NotEmpty().WithMessage("Lütfen zorunlu alanlarý doldurunuz.");

            RuleFor(x => x.Package.PackageKind).NotEmpty().WithMessage("Lütfen zorunlu alanlarý doldurunuz.");
            RuleFor(x => x.Package.PackageKind).IsInEnum().WithMessage("Paket Tipi Geçersiz!");

            RuleForEach(x => x.Package.PackagePackageTypeEnums).ChildRules(child =>
            {
                child.RuleFor(x => x.PackageTypeEnum).IsInEnum().WithMessage("Paket Türü Geçersiz!");
            });


            RuleFor(x => x.Package.ImageOfPackages.Count)
                .LessThan(6).WithMessage("En fazla 5 Paket Görseli eklenebilir.")
                .GreaterThan(0).WithMessage("En az 1 Paket Görseli eklenmeli.");

            When(x => x.Package.HasCoachService, () =>
                {
                    RuleFor(p => p.Package.CoachServicePackages).NotEmpty().WithMessage("Lütfen zorunlu alanlarý doldurunuz.");
                });

            When(x => x.Package.HasMotivationEvent, () =>
                {
                    RuleFor(p => p.Package.MotivationActivityPackages).NotEmpty().WithMessage("Lütfen zorunlu alanlarý doldurunuz.");
                });

            When(x => x.Package.HasTryingTest, () =>
                {
                    RuleFor(p => p.Package.TestExamPackages).NotEmpty().WithMessage("Lütfen zorunlu alanlarý doldurunuz.");
                });

            RuleFor(x => x.Package.IsActive).NotEmpty().WithMessage("Lütfen zorunlu alanlarý doldurunuz.");
            RuleFor(x => x.Package.PackagePublishers).NotEmpty().WithMessage("Lütfen zorunlu alanlarý doldurunuz.");
            RuleFor(x => x.Package.PackageLessons).NotEmpty().WithMessage("Lütfen zorunlu alanlarý doldurunuz.");
            RuleFor(x => x.Package.PackageFieldTypes).NotEmpty().WithMessage("Lütfen zorunlu alanlarý doldurunuz.");
            RuleFor(x => x.Package.PackageDocuments).NotEmpty().WithMessage("Lütfen zorunlu alanlarý doldurunuz.");
            RuleForEach(x => x.Package.PackageFieldTypes).ChildRules(child =>
                {
                    child.RuleFor(x => x.FieldType).IsInEnum().WithMessage("Paket Alanlarý Geçersiz.");
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