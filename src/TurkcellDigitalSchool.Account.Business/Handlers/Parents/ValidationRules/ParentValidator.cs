using FluentValidation;
using TurkcellDigitalSchool.Account.Business.Handlers.Parents.Commands;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Parents.ValidationRules
{

    public class CreateParentValidator : AbstractValidator<CreateParentCommand>
    {
        public CreateParentValidator()
        {
        }
    }
    public class UpdateParentValidator : AbstractValidator<UpdateParentCommand>
    {
        public UpdateParentValidator()
        {
            RuleFor(x => x.Entity.Id).NotEmpty();
        }
    }
}