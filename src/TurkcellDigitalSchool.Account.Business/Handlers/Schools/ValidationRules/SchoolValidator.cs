using FluentValidation;
using TurkcellDigitalSchool.Account.Business.Handlers.Schools.Commands;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Schools.ValidationRules
{

    public class CreateSchoolValidator : AbstractValidator<CreateSchoolCommand>
    {
        public CreateSchoolValidator()
        {
            RuleFor(x => x.Entity.Name).NotEmpty();
        }
    }
    public class UpdateSchoolValidator : AbstractValidator<UpdateSchoolCommand>
    {
        public UpdateSchoolValidator()
        {
            RuleFor(x => x.Entity.Id).NotEmpty();
        }
    }
}