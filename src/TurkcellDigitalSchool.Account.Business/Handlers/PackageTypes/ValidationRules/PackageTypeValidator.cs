using FluentValidation;
using TurkcellDigitalSchool.Account.Business.Handlers.PackageTypes.Commands;

namespace TurkcellDigitalSchool.Account.Business.Handlers.PackageTypes.ValidationRules
{

    public class CreatePackageTypeValidator : AbstractValidator<CreatePackageTypeCommand>
    {
        public CreatePackageTypeValidator()
        {
            RuleFor(x => x.PackageType.Name).NotEmpty();
        }
    }
    public class UpdatePackageTypeValidator : AbstractValidator<UpdatePackageTypeCommand>
    {
        public UpdatePackageTypeValidator()
        {
            RuleFor(x => x.PackageType.Id).NotEmpty();
            RuleFor(x => x.PackageType.Name).NotEmpty();
        }
    }

    public class DeletePackageTypeValidator : AbstractValidator<DeletePackageTypeCommand>
    {
        public DeletePackageTypeValidator()
        {
            RuleFor(x => x.Id).NotEmpty();
        }
    }
}