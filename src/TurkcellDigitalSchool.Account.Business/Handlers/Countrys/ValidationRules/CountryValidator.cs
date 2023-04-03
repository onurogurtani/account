using FluentValidation;
using TurkcellDigitalSchool.Account.Business.Handlers.Countrys.Commands;
using TurkcellDigitalSchool.Common.Constants;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Countrys.ValidationRules
{

    public class CreateCountryValidator : AbstractValidator<CreateCountryCommand>
    {
        public CreateCountryValidator()
        {
            RuleFor(x => x.Entity.Name).NotEmpty().WithMessage(string.Format(Messages.FieldIsNotNullOrEmpty, "Adý"));
        }
    }
    public class UpdateCountryValidator : AbstractValidator<UpdateCountryCommand>
    {
        public UpdateCountryValidator()
        {
            RuleFor(x => x.Entity.Id).NotEmpty().WithMessage(string.Format(Messages.FieldIsNotNullOrEmpty, "Id"));
            RuleFor(x => x.Entity.Name).NotEmpty().WithMessage(string.Format(Messages.FieldIsNotNullOrEmpty, "Adý"));
        }
    }
}