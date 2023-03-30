using FluentValidation;
using TurkcellDigitalSchool.Account.Business.Handlers.PackageRoles.Commands;

namespace TurkcellDigitalSchool.Account.Business.Handlers.PackageRoles.ValidationRules
{

    public class CreatePackageRoleValidator : AbstractValidator<CreatePackageRoleCommand>
    {
        public CreatePackageRoleValidator()
        {

        }
    }
    public class UpdatePackageRoleValidator : AbstractValidator<UpdatePackageRoleCommand>
    {
        public UpdatePackageRoleValidator()
        {
            RuleFor(x => x.Entity.Id).NotEmpty();
        }
    }
}