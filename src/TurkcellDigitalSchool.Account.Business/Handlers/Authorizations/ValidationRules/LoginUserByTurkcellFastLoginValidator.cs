using FluentValidation;
using TurkcellDigitalSchool.Account.Business.Handlers.Authorizations.Queries;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Authorizations.ValidationRules
{
    public class LoginUserByTurkcellFastLoginValidator : AbstractValidator<LoginUserByTurkcellFastLoginQuery>
    {
        public LoginUserByTurkcellFastLoginValidator()
        {
            RuleFor(m => m.AuthenticationCode).NotEmpty().NotNull();
        }
    }

}
