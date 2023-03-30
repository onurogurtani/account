using FluentValidation;
using TurkcellDigitalSchool.Account.Business.Handlers.Authorizations.Commands;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Authorizations.ValidationRules
{
    public class ForgottenPasswordTokenCheckValidator : AbstractValidator<ForgottenPasswordTokenCheckCommand>
    {

        public ForgottenPasswordTokenCheckValidator()
        {
            RuleFor(p => p.Token).NotEmpty(); 
        }
    }
}
