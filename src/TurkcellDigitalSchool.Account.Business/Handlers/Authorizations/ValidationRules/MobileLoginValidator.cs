using FluentValidation;
using TurkcellDigitalSchool.Account.Business.Constants;
using TurkcellDigitalSchool.Account.Business.Services.Authentication.Model;
using TurkcellDigitalSchool.Core.Enums; 

namespace TurkcellDigitalSchool.Account.Business.Handlers.Authorizations.ValidationRules
{
    public class MobileLoginValidator : AbstractValidator<VerifyOtpCommand>
    {
        public MobileLoginValidator()
        {
            RuleFor(p => p.ExternalUserId).NotEmpty();
            RuleFor(m => m.Code).Must((instance, value) =>
            {
                switch (instance.Provider)
                {
                    case AuthenticationProviderType.Person:
                        return value > 0;
                    case AuthenticationProviderType.Staff:
                        return value > 0;
                    case AuthenticationProviderType.Agent:
                        return value == 0;
                    case AuthenticationProviderType.Unknown:
                        break;
                    default:
                        break;
                }
                return false;
            })
            .WithMessage(Messages.InvalidCode);
        }
    }

}