using FluentValidation;
using TurkcellDigitalSchool.Account.Business.Handlers.Roles.Commands;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Roles.ValidationRules
{
    public class CreateRoleValidator : AbstractValidator<CreateRoleCommand>
    {
        public CreateRoleValidator()
        {
            RuleFor(x => x.Role.Name).NotEmpty().Length(2, 100).Matches("^[a-zA-Z0-9()������������ ]*$").WithMessage("L�tfen zorunlu alanlar� doldurunuz.");
            RuleFor(x => x.Role.RoleType).NotEmpty().IsInEnum().WithMessage("L�tfen zorunlu alanlar� doldurunuz.");
            RuleFor(x => x.Role.RoleClaims).NotEmpty().Must(x => x.Count > 0).WithMessage("L�tfen zorunlu alanlar� doldurunuz.");
        }
    }
    public class UpdateRoleValidator : AbstractValidator<UpdateRoleCommand>
    {
        public UpdateRoleValidator()
        {
            RuleFor(x => x.Role.Id).NotEmpty();
            RuleFor(x => x.Role.Name).NotEmpty().Length(2, 100).Matches("^[a-zA-Z0-9()������������ ]*$").WithMessage("L�tfen zorunlu alanlar� doldurunuz.");
            RuleFor(x => x.Role.RoleType).NotEmpty().IsInEnum().WithMessage("L�tfen zorunlu alanlar� doldurunuz.");
            RuleFor(x => x.Role.RoleClaims).NotEmpty().Must(x => x.Count > 0).WithMessage("L�tfen zorunlu alanlar� doldurunuz.");
        }
    }
    public class RoleCopyValidator : AbstractValidator<RoleCopyCommand>
    {
        public RoleCopyValidator()
        {
            RuleFor(x => x.RoleId).NotEmpty();
            RuleFor(x => x.RoleName).NotEmpty().Length(2, 100).Matches("^[a-zA-Z0-9()������������ ]*$").WithMessage("L�tfen zorunlu alanlar� doldurunuz.");
        }
    }
}