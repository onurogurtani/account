using FluentValidation;
using TurkcellDigitalSchool.Account.Business.Handlers.OrganisationTypes.Commands;

namespace TurkcellDigitalSchool.Account.Business.Handlers.OrganisationTypes.ValidationRules
{ 
    public class CreateOrganisationTypeValidator : AbstractValidator<CreateOrganisationTypeCommand>
    {
        public CreateOrganisationTypeValidator()
        {
            RuleFor(x => x.OrganisationType.Name).NotEmpty();
        }
    }
    public class UpdateOrganisationTypeValidator : AbstractValidator<UpdateOrganisationTypeCommand>
    {
        public UpdateOrganisationTypeValidator()
        {
            RuleFor(x => x.OrganisationType.Id).NotEmpty();
            RuleFor(x => x.OrganisationType.Name).NotEmpty();
        }
    }
}