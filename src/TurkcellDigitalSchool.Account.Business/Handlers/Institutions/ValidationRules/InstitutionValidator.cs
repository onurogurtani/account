using FluentValidation;
using TurkcellDigitalSchool.Account.Business.Handlers.Institutions.Commands;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Institutions.ValidationRules
{

    public class CreateInstitutionValidator : AbstractValidator<CreateInstitutionCommand>
    {
        public CreateInstitutionValidator()
        {
            RuleFor(x => x.Entity.Name).NotEmpty();
        }
    }
    public class UpdateInstitutionValidator : AbstractValidator<UpdateInstitutionCommand>
    {
        public UpdateInstitutionValidator()
        {
            RuleFor(x => x.Entity.Id).NotEmpty();
        }
    }
}