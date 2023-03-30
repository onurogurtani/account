using FluentValidation;
using TurkcellDigitalSchool.Account.Business.Handlers.GraduationYears.Commands;

namespace TurkcellDigitalSchool.Account.Business.Handlers.GraduationYears.ValidationRules
{

    public class CreateGraduationYearValidator : AbstractValidator<CreateGraduationYearCommand>
    {
        public CreateGraduationYearValidator()
        {
            RuleFor(x => x.Entity.Name).NotEmpty();
        }
    }
    public class UpdateGraduationYearValidator : AbstractValidator<UpdateGraduationYearCommand>
    {
        public UpdateGraduationYearValidator()
        {
            RuleFor(x => x.Entity.Id).NotEmpty();
        }
    }
}