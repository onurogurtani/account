using FluentValidation;
using TurkcellDigitalSchool.Account.Business.Handlers.ContractKinds.Commands;

namespace TurkcellDigitalSchool.Account.Business.Handlers.ContractKinds.ValidationRules
{

    public class CreateContractKindValidator : AbstractValidator<CreateContractKindCommand>
    {
        public CreateContractKindValidator()
        {
            RuleFor(x => x.ContractKind.Name).NotEmpty().MaximumLength(100).WithMessage("Lütfen zorunlu alanlarý doldurunuz.");
            RuleFor(x => x.ContractKind.ContractTypeId).NotEmpty().WithMessage("Lütfen zorunlu alanlarý doldurunuz.");
        }
    }
    public class UpdateContractKindValidator : AbstractValidator<UpdateContractKindCommand>
    {
        public UpdateContractKindValidator()
        {
            RuleFor(x => x.ContractKind.Id).NotEmpty().WithMessage("Lütfen zorunlu alanlarý doldurunuz.");
            RuleFor(x => x.ContractKind.Name).NotEmpty().WithMessage("Lütfen zorunlu alanlarý doldurunuz.");
            RuleFor(x => x.ContractKind.ContractTypeId).NotEmpty().WithMessage("Lütfen zorunlu alanlarý doldurunuz.");
        }
    }
}