using FluentValidation;
using TurkcellDigitalSchool.Account.Business.Handlers.Authorizations.Queries;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Authorizations.ValidationRules
{
    public class ReSendOtpSmsValidator : AbstractValidator<ReSendOtpSmsQuery>
    {
        public ReSendOtpSmsValidator()
        {
            RuleFor(p => p.MobileLoginId).NotEmpty();
        }
    }

}