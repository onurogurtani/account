using FluentValidation;
using TurkcellDigitalSchool.Account.Business.Handlers.Countys.Commands;
using TurkcellDigitalSchool.Common.Constants;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Countys.ValidationRules
{

    public class CreateCountyValidator : AbstractValidator<CreateCountyCommand>
    {
        public CreateCountyValidator()
        {
            RuleFor(x => x.Entity.Name).NotEmpty().WithMessage(string.Format(Messages.FieldIsNotNullOrEmpty, "Adý"));
        }
    }
    public class UpdateCountyValidator : AbstractValidator<UpdateCountyCommand>
    {
        public UpdateCountyValidator()
        {
            RuleFor(x => x.Entity.Id).NotEmpty().WithMessage(string.Format(Messages.FieldIsNotNullOrEmpty, "Id"));
            RuleFor(x => x.Entity.Name).NotEmpty().WithMessage(string.Format(Messages.FieldIsNotNullOrEmpty, "Adý"));
        }
    }
}