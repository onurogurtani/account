using FluentValidation;
using TurkcellDigitalSchool.Account.Business.Handlers.OrganisationLogos.Commands;

namespace TurkcellDigitalSchool.Account.Business.Handlers.OrganisationLogos.ValidationRules
{

    public class CreateOrganisationLogoValidator : AbstractValidator<CreateOrganisationLogoCommand>
    {
        public CreateOrganisationLogoValidator()
        {
            RuleFor(x => x.Image).NotEmpty();
        }
    }
    public class UpdateOrganisationLogoValidator : AbstractValidator<UpdateOrganisationLogoCommand>
    {
        public UpdateOrganisationLogoValidator()
        {
            RuleFor(x => x.Id).NotEmpty();
            RuleFor(x => x.Image).NotEmpty();
        }
    }
}