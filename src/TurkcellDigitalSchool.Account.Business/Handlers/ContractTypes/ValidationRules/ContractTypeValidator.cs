using FluentValidation;
using TurkcellDigitalSchool.Account.Business.Handlers.ContractTypes.Commands;

namespace TurkcellDigitalSchool.Account.Business.Handlers.ContractTypes.ValidationRules
{

    public class CreateContractTypeValidator : AbstractValidator<CreateContractTypeCommand>
    {
        public CreateContractTypeValidator()
        {
            RuleFor(x => x.ContractType.Name).NotEmpty().WithMessage("Lütfen zorunlu alanları doldurunuz.");
        }
    }
    public class UpdateContractTypeValidator : AbstractValidator<UpdateContractTypeCommand>
    {
        public UpdateContractTypeValidator()
        {
            RuleFor(x => x.ContractType.Id).NotEmpty().WithMessage("Lütfen zorunlu alanları doldurunuz.");
            RuleFor(x => x.ContractType.Name).NotEmpty().WithMessage("Lütfen zorunlu alanları doldurunuz.");
        }
    }
}