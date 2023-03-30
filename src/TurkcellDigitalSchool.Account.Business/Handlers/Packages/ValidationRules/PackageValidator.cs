using System;
using FluentValidation;
using TurkcellDigitalSchool.Account.Business.Handlers.Packages.Commands;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Packages.ValidationRules
{

    public class CreatePackageValidator : AbstractValidator<CreatePackageCommand>
    {
        public CreatePackageValidator()
        {
            RuleFor(x => x.Package.Name).NotEmpty().WithMessage("L�tfen zorunlu alanlar� doldurunuz.");

            RuleFor(x => x.Package.StartDate).NotEmpty().WithMessage("L�tfen zorunlu alanlar� doldurunuz.")
                .GreaterThan(x => DateTime.Now).WithMessage("L�tfen girilen tarihleri kontrol ediniz.");
            RuleFor(x => x.Package.FinishDate).NotEmpty().WithMessage("L�tfen zorunlu alanlar� doldurunuz.")
                .GreaterThan(x => x.Package.StartDate).WithMessage("L�tfen girilen tarihleri kontrol ediniz.");

            RuleFor(x => x.Package.Content).NotEmpty().WithMessage("L�tfen zorunlu alanlar� doldurunuz.");
            RuleFor(x => x.Package.Summary).NotEmpty().WithMessage("L�tfen zorunlu alanlar� doldurunuz.");

            RuleFor(x => x.Package.PackageKind).NotEmpty().WithMessage("L�tfen zorunlu alanlar� doldurunuz.");
            RuleFor(x => x.Package.PackageKind).IsInEnum().WithMessage("Paket Tipi Ge�ersiz!");

            RuleForEach(x => x.Package.PackagePackageTypeEnums).ChildRules(child =>
                {
                    child.RuleFor(x => x.PackageTypeEnum).IsInEnum().WithMessage("Paket T�r� Ge�ersiz!");
                });


            RuleFor(x => x.Package.ImageOfPackages.Count)
                .LessThan(6).WithMessage("En fazla 5 Paket G�rseli eklenebilir.")
                .GreaterThan(0).WithMessage("En az 1 Paket G�rseli eklenmeli.");

            When(x => x.Package.HasCoachService, () =>
                {
                    RuleFor(p => p.Package.CoachServicePackages).NotEmpty().WithMessage("L�tfen zorunlu alanlar� doldurunuz.");
                });

            When(x => x.Package.HasMotivationEvent, () =>
                {
                    RuleFor(p => p.Package.MotivationActivityPackages).NotEmpty().WithMessage("L�tfen zorunlu alanlar� doldurunuz.");
                });

            When(x => x.Package.HasTryingTest, () =>
                {
                    RuleFor(p => p.Package.TestExamPackages).NotEmpty().WithMessage("L�tfen zorunlu alanlar� doldurunuz.");
                });

            RuleFor(x => x.Package.IsActive).NotEmpty().WithMessage("L�tfen zorunlu alanlar� doldurunuz.");
            RuleFor(x => x.Package.PackagePublishers).NotEmpty().WithMessage("L�tfen zorunlu alanlar� doldurunuz.");
            RuleFor(x => x.Package.PackageLessons).NotEmpty().WithMessage("L�tfen zorunlu alanlar� doldurunuz.");
            RuleFor(x => x.Package.PackageFieldTypes).NotEmpty().WithMessage("L�tfen zorunlu alanlar� doldurunuz.");
            RuleFor(x => x.Package.PackageDocuments).NotEmpty().WithMessage("L�tfen zorunlu alanlar� doldurunuz.");
            RuleForEach(x => x.Package.PackageFieldTypes).ChildRules(child =>
                {
                    child.RuleFor(x => x.FieldType).IsInEnum().WithMessage("Paket Alanlar� Ge�ersiz.");
                });
        }
    }

    public class UpdatePackageValidator : AbstractValidator<UpdatePackageCommand>
    {
        public UpdatePackageValidator()
        {
            RuleFor(x => x.Package.Id).NotEmpty().WithMessage("L�tfen zorunlu alanlar� doldurunuz.");
            RuleFor(x => x.Package.Name).NotEmpty().WithMessage("L�tfen zorunlu alanlar� doldurunuz.");

            RuleFor(x => x.Package.StartDate).NotEmpty().WithMessage("L�tfen zorunlu alanlar� doldurunuz.")
                .GreaterThan(x => DateTime.Now).WithMessage("L�tfen girilen tarihleri kontrol ediniz.");
            RuleFor(x => x.Package.FinishDate).NotEmpty().WithMessage("L�tfen zorunlu alanlar� doldurunuz.")
                .GreaterThan(x => x.Package.StartDate).WithMessage("L�tfen girilen tarihleri kontrol ediniz.");

            RuleFor(x => x.Package.Content).NotEmpty().WithMessage("L�tfen zorunlu alanlar� doldurunuz.");
            RuleFor(x => x.Package.Summary).NotEmpty().WithMessage("L�tfen zorunlu alanlar� doldurunuz.");

            RuleFor(x => x.Package.PackageKind).NotEmpty().WithMessage("L�tfen zorunlu alanlar� doldurunuz.");
            RuleFor(x => x.Package.PackageKind).IsInEnum().WithMessage("Paket Tipi Ge�ersiz!");

            RuleForEach(x => x.Package.PackagePackageTypeEnums).ChildRules(child =>
            {
                child.RuleFor(x => x.PackageTypeEnum).IsInEnum().WithMessage("Paket T�r� Ge�ersiz!");
            });


            RuleFor(x => x.Package.ImageOfPackages.Count)
                .LessThan(6).WithMessage("En fazla 5 Paket G�rseli eklenebilir.")
                .GreaterThan(0).WithMessage("En az 1 Paket G�rseli eklenmeli.");

            When(x => x.Package.HasCoachService, () =>
                {
                    RuleFor(p => p.Package.CoachServicePackages).NotEmpty().WithMessage("L�tfen zorunlu alanlar� doldurunuz.");
                });

            When(x => x.Package.HasMotivationEvent, () =>
                {
                    RuleFor(p => p.Package.MotivationActivityPackages).NotEmpty().WithMessage("L�tfen zorunlu alanlar� doldurunuz.");
                });

            When(x => x.Package.HasTryingTest, () =>
                {
                    RuleFor(p => p.Package.TestExamPackages).NotEmpty().WithMessage("L�tfen zorunlu alanlar� doldurunuz.");
                });

            RuleFor(x => x.Package.IsActive).NotEmpty().WithMessage("L�tfen zorunlu alanlar� doldurunuz.");
            RuleFor(x => x.Package.PackagePublishers).NotEmpty().WithMessage("L�tfen zorunlu alanlar� doldurunuz.");
            RuleFor(x => x.Package.PackageLessons).NotEmpty().WithMessage("L�tfen zorunlu alanlar� doldurunuz.");
            RuleFor(x => x.Package.PackageFieldTypes).NotEmpty().WithMessage("L�tfen zorunlu alanlar� doldurunuz.");
            RuleFor(x => x.Package.PackageDocuments).NotEmpty().WithMessage("L�tfen zorunlu alanlar� doldurunuz.");
            RuleForEach(x => x.Package.PackageFieldTypes).ChildRules(child =>
                {
                    child.RuleFor(x => x.FieldType).IsInEnum().WithMessage("Paket Alanlar� Ge�ersiz.");
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