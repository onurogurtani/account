using FluentValidation;
using TurkcellDigitalSchool.Account.Business.Services.Authentication.Model;
using TurkcellDigitalSchool.Core.Enums; 

namespace TurkcellDigitalSchool.Account.Business.Handlers.Authorizations.ValidationRules
{
    public class LoginUserValidator : AbstractValidator<LoginUserCommand>
    {
        public LoginUserValidator()
        {
            RuleFor(m => m.Password).NotEmpty()
              .When((i) => i.Provider != AuthenticationProviderType.Person);
        }
    }

}
