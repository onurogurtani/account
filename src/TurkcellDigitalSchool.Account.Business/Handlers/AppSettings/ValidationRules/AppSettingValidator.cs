using FluentValidation;
using TurkcellDigitalSchool.Account.Business.Handlers.AppSettings.Commands;

namespace TurkcellDigitalSchool.Account.Business.Handlers.AppSettings.ValidationRules
{

    public class CreateAppSettingValidator : AbstractValidator<CreateAppSettingCommand>
    {
        public CreateAppSettingValidator()
        {
            RuleFor(x => x.Entity.Code).NotEmpty();
            RuleFor(x => x.Entity.Name).NotEmpty();
            RuleFor(x => x.Entity.RecordStatus).NotEmpty();
        }
    }
    public class UpdateAppSettingValidator : AbstractValidator<UpdateAppSettingCommand>
    {
        public UpdateAppSettingValidator()
        {
            RuleFor(x => x.Entity.Id).NotEmpty();
        }
    }

    public class SetPasswordRuleAndPeriodValueValidator : AbstractValidator<SetPasswordRuleAndPeriodValueCommand>
    {
        public SetPasswordRuleAndPeriodValueValidator()
        {
            RuleFor(x => x.MinCharacter).NotEmpty();
            RuleFor(x => x.MaxCharacter).NotEmpty();
            RuleFor(x => x.MaxCharacter).GreaterThan(x => x.MinCharacter).WithMessage("Minimum karakter sayýsý, Maximum karakter sayýsýndan büyük olamaz.");
        }
    }

}
