using FluentValidation;
using TurkcellDigitalSchool.Account.Business.Handlers.AvatarFiles.Commands;
using TurkcellDigitalSchool.Common.Constants;
using TurkcellDigitalSchool.Common.Helpers;
using TurkcellDigitalSchool.Core.CustomAttribute;
using TurkcellDigitalSchool.Core.Enums;

namespace TurkcellDigitalSchool.Account.Business.Handlers.AvatarFiles.ValidationRules
{
    [MessageClassAttr("Avatar Ekleme Do�rulay�c�s�")]
    public class CreateAvatarFileValidator : AbstractValidator<CreateAvatarFileCommand>
    {
        [MessageConstAttr(MessageCodeType.Error, "G�rsel")]
        private static string FieldIsNotNullOrEmpty = Messages.FieldIsNotNullOrEmpty;
        public CreateAvatarFileValidator()
        {
            RuleFor(x => x.Image).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "G�rsel" }));
        }
    }
    [MessageClassAttr("Avatar Ekleme Do�rulay�c�s�")]
    public class UpdateAvatarFileValidator : AbstractValidator<UpdateAvatarFileCommand>
    {
        [MessageConstAttr(MessageCodeType.Error, "Id,G�rsel")]
        private static string FieldIsNotNullOrEmpty = Messages.FieldIsNotNullOrEmpty;
        public UpdateAvatarFileValidator()
        {
            RuleFor(x => x.Image).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Id" }));
            RuleFor(x => x.Image).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "G�rsel" }));
        }
    }
}