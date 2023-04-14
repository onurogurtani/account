using FluentValidation;
using TurkcellDigitalSchool.Account.Business.Handlers.Authorizations.Commands;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Authorizations.ValidationRules
{
    public class ForgotPasswordWithCheckFailCountCommandValidator : AbstractValidator<ForgotPasswordWithCheckFailCountCommand>
    {
        public ForgotPasswordWithCheckFailCountCommandValidator()
        {
            RuleFor(p => p.SendingAdress).NotEmpty();
            RuleFor(p => p.CsrfToken).NotEmpty();
        }
    }
}
