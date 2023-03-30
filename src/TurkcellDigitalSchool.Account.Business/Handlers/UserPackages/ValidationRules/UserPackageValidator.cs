using FluentValidation;
using TurkcellDigitalSchool.Account.Business.Handlers.UserPackages.Commands;

namespace TurkcellDigitalSchool.Account.Business.Handlers.UserPackages.ValidationRules
{
    public class CreateUserPackageValidator : AbstractValidator<CreateUserPackageCommand>
    {
        public CreateUserPackageValidator()
        {
        }
    }
    public class UpdateUserPackageValidator : AbstractValidator<UpdateUserPackageCommand>
    {
        public UpdateUserPackageValidator()
        {
            RuleFor(x => x.Entity.Id).NotEmpty();
        }
    }
}