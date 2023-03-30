using FluentValidation;
using TurkcellDigitalSchool.Account.Business.Handlers.Authorizations.Queries;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Authorizations.ValidationRules
{
    public class LoginUserByLdapValidator : AbstractValidator<LoginUserByLdapQuery>
    {
        public LoginUserByLdapValidator()
        {
            RuleFor(m => m.UserName).NotEmpty().NotNull();
            RuleFor(m => m.Password).NotEmpty().NotNull();
        }
    }

}
