using FluentValidation;
using TurkcellDigitalSchool.Account.Business.Handlers.Educations.Commands;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Educations.ValidationRules
{

    public class CreateEducationValidator : AbstractValidator<CreateEducationCommand>
    {
        public CreateEducationValidator()
        {
        }
    }
    public class UpdateEducationValidator : AbstractValidator<UpdateEducationCommand>
    {
        public UpdateEducationValidator()
        {
            RuleFor(x => x.Entity.Id).NotEmpty();
        }
    }
}