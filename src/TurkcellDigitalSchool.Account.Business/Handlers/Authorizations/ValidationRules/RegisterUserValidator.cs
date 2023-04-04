using FluentValidation;
using TurkcellDigitalSchool.Account.Business.Handlers.Authorizations.Commands;
using TurkcellDigitalSchool.Common.Constants;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Authorizations.ValidationRules
{
    public class RegisterUserValidator : AbstractValidator<RegisterUserCommand>
    {
        public RegisterUserValidator()
        {
            RuleFor(x => x.Email).EmailAddress().When(w => !string.IsNullOrEmpty(w.Email)).WithMessage(Messages.EmailIsNotValid);
       
            When(w => w.UserTypeId == Core.Enums.UserType.Student, () =>
            {
                RuleFor(x => x.Email).NotEmpty().WithMessage(Messages.RequiredField);
            });

            When(w => w.UserTypeId == Core.Enums.UserType.Parent, () =>
            {
                RuleFor(x => x.Email).NotEmpty().WithMessage(Messages.RequiredField);
                RuleFor(x => x.MobilePhones).NotEmpty().WithMessage(Messages.RequiredField);
            });

            When(x => x.CitizenId != 0, () =>
            {
                RuleFor(x => x.CitizenId.ToString()).Must(x=> x.Length == 11).WithMessage(Messages.WrongCitizenId);
            });
        }
    }
}