using FluentValidation;
using TurkcellDigitalSchool.Account.Business.Handlers.RoleClaims.Commands;

namespace TurkcellDigitalSchool.Account.Business.Handlers.RoleClaims.ValidationRules
{

    public class CreateRoleClaimValidator : AbstractValidator<CreateRoleClaimCommand>
    {
        public CreateRoleClaimValidator()
        {
        }
    }
    public class UpdateRoleClaimValidator : AbstractValidator<UpdateRoleClaimCommand>
    {
        public UpdateRoleClaimValidator()
        {
            RuleFor(x => x.Entity.Id).NotEmpty();
        }
    }
}