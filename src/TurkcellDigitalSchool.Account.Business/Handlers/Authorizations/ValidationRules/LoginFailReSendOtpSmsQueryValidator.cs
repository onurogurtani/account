using FluentValidation;
using TurkcellDigitalSchool.Account.Business.Handlers.Authorizations.Queries;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Authorizations.ValidationRules
{
    public class LoginFailReSendOtpSmsQueryValidator : AbstractValidator<LoginFailReSendOtpSmsQuery>
    {
        public LoginFailReSendOtpSmsQueryValidator()
        { 
            RuleFor(p => p.MobileLoginId).NotEmpty(); 
            RuleFor(p => p.XId).NotEmpty();
        }
    }
}
