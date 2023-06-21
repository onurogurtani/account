using FluentValidation;
using TurkcellDigitalSchool.Account.Business.Handlers.Citys.Commands;
using TurkcellDigitalSchool.Core.Common.Constants;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Citys.ValidationRules
{

    public class CreateCityValidator : AbstractValidator<CreateCityCommand>
    {
        public CreateCityValidator()
        {
            RuleFor(x => x.Entity.Name).NotEmpty().WithMessage(string.Format(Messages.FieldIsNotNullOrEmpty, "Adý"));
        }
    }
    public class UpdateCityValidator : AbstractValidator<UpdateCityCommand>
    {
        public UpdateCityValidator()
        {
            RuleFor(x => x.Entity.Id).NotEmpty().WithMessage(string.Format(Messages.FieldIsNotNullOrEmpty, "Id"));
            RuleFor(x => x.Entity.Name).NotEmpty().WithMessage(string.Format(Messages.FieldIsNotNullOrEmpty, "Adý"));
        }
    }
}