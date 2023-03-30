using FluentValidation;
using TurkcellDigitalSchool.Account.Business.Handlers.TargetScreens.Commands;

namespace TurkcellDigitalSchool.Account.Business.Handlers.TargetScreens.ValidationRules
{

    public class CreateTargetScreenValidator : AbstractValidator<CreateTargetScreenCommand>
    {
        public CreateTargetScreenValidator()
        {
            RuleFor(x => x.TargetScreen.Name).NotEmpty();
            RuleFor(x => x.TargetScreen.PageName).NotEmpty();
        }
    }
    public class UpdateTargetScreenValidator : AbstractValidator<UpdateTargetScreenCommand>
    {
        public UpdateTargetScreenValidator()
        {
            RuleFor(x => x.TargetScreen.Id).NotEmpty();
            RuleFor(x => x.TargetScreen.Name).NotEmpty();
            RuleFor(x => x.TargetScreen.PageName).NotEmpty();
        }
    }

    public class DeleteTargetScreenValidator : AbstractValidator<DeleteTargetScreenCommand>
    {
        public DeleteTargetScreenValidator()
        {
            RuleFor(x => x.Id).NotEmpty();
        }
    }
}