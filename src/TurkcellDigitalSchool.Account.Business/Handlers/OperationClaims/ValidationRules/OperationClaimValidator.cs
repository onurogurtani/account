using FluentValidation;
using TurkcellDigitalSchool.Account.Business.Handlers.OperationClaims.Commands;

namespace TurkcellDigitalSchool.Account.Business.Handlers.OperationClaims.ValidationRules
{

    public class CreateOperationClaimValidator : AbstractValidator<CreateOperationClaimCommand>
    {
        public CreateOperationClaimValidator()
        {
            RuleFor(x => x.Entity.Name).NotEmpty();
        }
    }
    public class UpdateOperationClaimValidator : AbstractValidator<UpdateOperationClaimCommand>
    {
        public UpdateOperationClaimValidator()
        {
            RuleFor(x => x.Entity.Id).NotEmpty();
        }
    }
}