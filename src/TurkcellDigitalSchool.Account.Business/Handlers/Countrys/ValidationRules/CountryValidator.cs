using FluentValidation;
using TurkcellDigitalSchool.Account.Business.Handlers.Countrys.Commands;
using TurkcellDigitalSchool.Core.Common.Constants;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Countrys.ValidationRules
{

    public class CreateCountryValidator : AbstractValidator<CreateCountryCommand>
    {
        public CreateCountryValidator()
        {
            RuleFor(x => x.Entity.Name).NotEmpty().WithMessage(string.Format(Messages.FieldIsNotNullOrEmpty, "Ad�"));
        }
    }
    public class UpdateCountryValidator : AbstractValidator<UpdateCountryCommand>
    {
        public UpdateCountryValidator()
        {
            RuleFor(x => x.Entity.Id).NotEmpty().WithMessage(string.Format(Messages.FieldIsNotNullOrEmpty, "Id"));
            RuleFor(x => x.Entity.Name).NotEmpty().WithMessage(string.Format(Messages.FieldIsNotNullOrEmpty, "Ad�"));
        }
    }
}