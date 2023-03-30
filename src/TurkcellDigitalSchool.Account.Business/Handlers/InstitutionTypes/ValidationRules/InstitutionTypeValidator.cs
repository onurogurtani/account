using FluentValidation;
using TurkcellDigitalSchool.Account.Business.Handlers.InstitutionTypes.Commands;

namespace TurkcellDigitalSchool.Account.Business.Handlers.InstitutionTypes.ValidationRules
{
    public class CreateInstitutionTypeValidator : AbstractValidator<CreateInstitutionTypeCommand>
    {
        public CreateInstitutionTypeValidator()
        {
            RuleFor(x => x.Entity.Name).NotEmpty();
        }
    }
    public class UpdateInstitutionTypeValidator : AbstractValidator<UpdateInstitutionTypeCommand>
    {
        public UpdateInstitutionTypeValidator()
        {
            RuleFor(x => x.Entity.Id).NotEmpty();
        }
    }
}