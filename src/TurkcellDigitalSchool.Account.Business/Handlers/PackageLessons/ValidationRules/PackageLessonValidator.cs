using FluentValidation;
using TurkcellDigitalSchool.Account.Business.Handlers.PackageLessons.Commands;

namespace TurkcellDigitalSchool.Account.Business.Handlers.PackageLessons.ValidationRules
{

    public class CreatePackageLessonValidator : AbstractValidator<CreatePackageLessonCommand>
    {
        public CreatePackageLessonValidator()
        {

        }
    }
    public class UpdatePackageLessonValidator : AbstractValidator<UpdatePackageLessonCommand>
    {
        public UpdatePackageLessonValidator()
        {
            RuleFor(x => x.Entity.Id).NotEmpty();
        }
    }
}