using FluentValidation;
using TurkcellDigitalSchool.Account.Business.Handlers.Users.Commands;
using TurkcellDigitalSchool.Common.Constants;
using TurkcellDigitalSchool.Common.Helpers;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Users.ValidationRules
{
    public class AddUserValidator : AbstractValidator<AddUserCommand>
    {
        public AddUserValidator()
        {
            RuleFor(x => x.UserTypeId).NotEmpty().WithMessage(Messages.RequiredField);
            RuleFor(x => x.Name).NotEmpty().WithMessage(Messages.RequiredField);
            RuleFor(x => x.SurName).NotEmpty().WithMessage(Messages.RequiredField);
            RuleFor(x => x.CitizenId).NotEmpty().WithMessage(Messages.RequiredField);
            RuleFor(x => x.MobilePhones).NotEmpty().WithMessage(Messages.RequiredField);
            RuleFor(x => x.Email).EmailAddress().When(w => !string.IsNullOrEmpty(w.Email)).WithMessage(Messages.EmailIsNotValid);
            RuleFor(x => x.MobilePhones).NumberMustBe10Digit().When(w => !string.IsNullOrEmpty(w.MobilePhones));
        }
    }

    public class SetStatusUserValidator : AbstractValidator<SetStatusUserCommand>
    {
        public SetStatusUserValidator()
        {
            RuleFor(x => x.Id).NotEmpty().WithMessage(Messages.RequiredField);
        }
    }
}