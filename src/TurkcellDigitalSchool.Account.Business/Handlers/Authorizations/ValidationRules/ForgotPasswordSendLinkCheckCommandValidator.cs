using FluentValidation;
using TurkcellDigitalSchool.Account.Business.Handlers.Authorizations.Commands;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Authorizations.ValidationRules
{
    public class ForgotPasswordSendLinkCheckCommandValidator : AbstractValidator<ForgotPasswordSendLinkCheckCommand>
    {
        public ForgotPasswordSendLinkCheckCommandValidator()
        {
            RuleFor(p => p.Guid).NotEmpty(); 
            RuleFor(p => p.XId).NotEmpty();
        }
    }
}
