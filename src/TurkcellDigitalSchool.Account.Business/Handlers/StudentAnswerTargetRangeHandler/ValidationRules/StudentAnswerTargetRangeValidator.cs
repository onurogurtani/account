using FluentValidation;
using TurkcellDigitalSchool.Account.Business.Handlers.StudentAnswerTargetRangeHandler.Commands;

namespace TurkcellDigitalSchool.Account.Business.Handlers.StudentAnswerTargetRangeHandler.ValidationRules
{
    public class CreateStudentAnswerTargetRangeValidator : AbstractValidator<CreateStudentAnswerTargetRangeCommand>
    {
        public CreateStudentAnswerTargetRangeValidator()
        {
            RuleFor(x => x.UserId).NotEmpty();
            RuleFor(x => x.PackageId).NotEmpty().WithMessage("Lütfen paket seçiniz."); ;
            RuleFor(x => x.TargetRangeMax).NotEmpty().WithMessage("Lütfen zorunlu alanları doldurunuz.");
            RuleFor(x => x.TargetRangeMax).NotEmpty().WithMessage("Lütfen zorunlu alanları doldurunuz.");
        }

    }
    public class UpdateStudentAnswerTargetRangeValidator : AbstractValidator<UpdateStudentAnswerTargetRangeCommand>
    {
        public UpdateStudentAnswerTargetRangeValidator()
        {
            RuleFor(x => x.Id).NotEmpty();
            RuleFor(x => x.TargetRangeMax).NotEmpty().WithMessage("Lütfen zorunlu alanları doldurunuz.");
            RuleFor(x => x.TargetRangeMax).NotEmpty().WithMessage("Lütfen zorunlu alanları doldurunuz.");
        }
    }
    public class DeleteStudentAnswerTargetRangeValidator : AbstractValidator<DeleteStudentAnswerTargetRangeCommand>
    {
        public DeleteStudentAnswerTargetRangeValidator()
        {
            RuleFor(x => x.Id).NotEmpty();
        }
    }
}
