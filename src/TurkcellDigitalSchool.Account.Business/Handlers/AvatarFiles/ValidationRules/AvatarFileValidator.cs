using FluentValidation;
using TurkcellDigitalSchool.Account.Business.Handlers.AvatarFiles.Commands;
using TurkcellDigitalSchool.Common.Constants;
using TurkcellDigitalSchool.Common.Helpers;
using TurkcellDigitalSchool.Core.CustomAttribute;
using TurkcellDigitalSchool.Core.Enums;

namespace TurkcellDigitalSchool.Account.Business.Handlers.AvatarFiles.ValidationRules
{
    [MessageClassAttr("Avatar Ekleme Doðrulayýcýsý")]
    public class CreateAvatarFileValidator : AbstractValidator<CreateAvatarFileCommand>
    {
        [MessageConstAttr(MessageCodeType.Error, "Görsel")]
        private static string FieldIsNotNullOrEmpty = Messages.FieldIsNotNullOrEmpty;
        public CreateAvatarFileValidator()
        {
            RuleFor(x => x.Image).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Görsel" }));
        }
    }
    [MessageClassAttr("Avatar Ekleme Doðrulayýcýsý")]
    public class UpdateAvatarFileValidator : AbstractValidator<UpdateAvatarFileCommand>
    {
        [MessageConstAttr(MessageCodeType.Error, "Id,Görsel")]
        private static string FieldIsNotNullOrEmpty = Messages.FieldIsNotNullOrEmpty;
        public UpdateAvatarFileValidator()
        {
            RuleFor(x => x.Image).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Id" }));
            RuleFor(x => x.Image).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Görsel" }));
        }
    }
}