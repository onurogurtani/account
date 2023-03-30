using FluentValidation;
using TurkcellDigitalSchool.Account.Business.Handlers.UserRoles.Commands;

namespace TurkcellDigitalSchool.Account.Business.Handlers.UserRoles.ValidationRules
{

    public class CreateUserRoleValidator : AbstractValidator<CreateUserRoleCommand>
    {
        public CreateUserRoleValidator()
        {

        }
    }
    public class UpdateUserRoleValidator : AbstractValidator<UpdateUserRoleCommand>
    {
        public UpdateUserRoleValidator()
        {
            RuleFor(x => x.Entity.Id).NotEmpty();
        }
    }
}