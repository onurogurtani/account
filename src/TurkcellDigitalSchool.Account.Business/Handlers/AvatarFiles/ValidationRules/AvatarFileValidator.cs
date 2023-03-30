using FluentValidation;
using TurkcellDigitalSchool.Account.Business.Handlers.AvatarFiles.Commands;

namespace TurkcellDigitalSchool.Account.Business.Handlers.AvatarFiles.ValidationRules
{

    public class CreateAvatarFileValidator : AbstractValidator<CreateAvatarFileCommand>
    {
        public CreateAvatarFileValidator()
        {
            RuleFor(x => x.Image).NotEmpty();
        }
    }
    public class UpdateAvatarFileValidator : AbstractValidator<UpdateAvatarFileCommand>
    {
        public UpdateAvatarFileValidator()
        {
            RuleFor(x => x.Id).NotEmpty();
            RuleFor(x => x.Image).NotEmpty();
        }
    }
}