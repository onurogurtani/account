using FluentValidation;
using TurkcellDigitalSchool.Account.Business.Handlers.ContractKinds.Commands;

namespace TurkcellDigitalSchool.Account.Business.Handlers.ContractKinds.ValidationRules
{

    public class CreateContractKindValidator : AbstractValidator<CreateContractKindCommand>
    {
        public CreateContractKindValidator()
        {
            RuleFor(x => x.ContractKind.Name).NotEmpty().MaximumLength(100).WithMessage("L�tfen zorunlu alanlar� doldurunuz.");
            RuleFor(x => x.ContractKind.ContractTypeId).NotEmpty().WithMessage("L�tfen zorunlu alanlar� doldurunuz.");
        }
    }
    public class UpdateContractKindValidator : AbstractValidator<UpdateContractKindCommand>
    {
        public UpdateContractKindValidator()
        {
            RuleFor(x => x.ContractKind.Id).NotEmpty().WithMessage("L�tfen zorunlu alanlar� doldurunuz.");
            RuleFor(x => x.ContractKind.Name).NotEmpty().WithMessage("L�tfen zorunlu alanlar� doldurunuz.");
            RuleFor(x => x.ContractKind.ContractTypeId).NotEmpty().WithMessage("L�tfen zorunlu alanlar� doldurunuz.");
        }
    }
}