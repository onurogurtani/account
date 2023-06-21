using FluentValidation;
using TurkcellDigitalSchool.Account.Business.Handlers.Roles.Commands;
using TurkcellDigitalSchool.Core.Common.Constants;
using TurkcellDigitalSchool.Core.Common.Helpers;
using TurkcellDigitalSchool.Core.CustomAttribute;
using TurkcellDigitalSchool.Core.Enums;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Roles.ValidationRules
{
    [MessageClassAttr("Rol Ekleme Do�rulay�c�s�")]
    public class CreateRoleValidator : AbstractValidator<CreateRoleCommand>
    {
        [MessageConstAttr(MessageCodeType.Error, "�sim,Kullan�c� Tipi,Rol Yetki")]
        private static string FieldIsNotNullOrEmpty = Messages.FieldIsNotNullOrEmpty;
        [MessageConstAttr(MessageCodeType.Error, "2,100")]
        private static string NumberMustBeCharacterLength = Messages.NumberMustBeCharacterLength;
        [MessageConstAttr(MessageCodeType.Error, "�sim")]
        private static string MustBeOnlyletter = Constants.Messages.MustBeOnlyLetter;
        [MessageConstAttr(MessageCodeType.Error)]
        private static string IsInEnumValue = Messages.IsInEnumValue;
        public CreateRoleValidator()
        {
            RuleFor(x => x.Role.Name).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "�sim" })).Length(2, 100).WithMessage(NumberMustBeCharacterLength.PrepareRedisMessage(messageParameters: new object[] { "2", "100" })).Matches("^[a-zA-Z0-9()������������ ]*$").WithMessage(MustBeOnlyletter.PrepareRedisMessage(messageParameters: new object[] { "�sim" }));
            RuleFor(x => x.Role.UserType).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Kullan�c� Tipi" })).IsInEnum().WithMessage(IsInEnumValue);
            RuleFor(x => x.Role.RoleClaims).NotEmpty().Must(x => x.Count > 0).WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Rol Yetki" }));
        }
    }

    [MessageClassAttr("Rol G�ncelleme Do�rulay�c�s�")]
    public class UpdateRoleValidator : AbstractValidator<UpdateRoleCommand>
    {
        [MessageConstAttr(MessageCodeType.Error, "Id,�sim,Kullan�c� Tipi,Rol Yetki")]
        private static string FieldIsNotNullOrEmpty = Messages.FieldIsNotNullOrEmpty;
        [MessageConstAttr(MessageCodeType.Error, "2,100")]
        private static string NumberMustBeCharacterLength = Messages.NumberMustBeCharacterLength;
        [MessageConstAttr(MessageCodeType.Error, "�sim")]
        private static string MustBeOnlyletter = Constants.Messages.MustBeOnlyLetter;
        [MessageConstAttr(MessageCodeType.Error)]
        private static string IsInEnumValue = Messages.IsInEnumValue;
        public UpdateRoleValidator()
        {
            RuleFor(x => x.Role.Id).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Id" }));
            RuleFor(x => x.Role.Name).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "�sim" })).Length(2, 100).WithMessage(NumberMustBeCharacterLength.PrepareRedisMessage(messageParameters: new object[] { "2", "100" })).Matches("^[a-zA-Z0-9()������������ ]*$").WithMessage(MustBeOnlyletter.PrepareRedisMessage(messageParameters: new object[] { "�sim" }));
            RuleFor(x => x.Role.UserType).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Kullan�c� Tipi" })).IsInEnum().WithMessage(IsInEnumValue);
            RuleFor(x => x.Role.RoleClaims).NotEmpty().Must(x => x.Count > 0).WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Rol Yetki" }));
        }
    }

    [MessageClassAttr("Rol Kopyalama Do�rulay�c�s�")]
    public class RoleCopyValidator : AbstractValidator<RoleCopyCommand>
    {
        [MessageConstAttr(MessageCodeType.Error, "Id,�sim")]
        private static string FieldIsNotNullOrEmpty = Messages.FieldIsNotNullOrEmpty;
        [MessageConstAttr(MessageCodeType.Error, "2,100")]
        private static string NumberMustBeCharacterLength = Messages.NumberMustBeCharacterLength;
        [MessageConstAttr(MessageCodeType.Error, "�sim")]
        private static string MustBeOnlyletter = Constants.Messages.MustBeOnlyLetter;
        public RoleCopyValidator()
        {
            RuleFor(x => x.RoleId).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Id" }));
            RuleFor(x => x.RoleName).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "�sim" })).Length(2, 100).WithMessage(NumberMustBeCharacterLength.PrepareRedisMessage(messageParameters: new object[] { "2", "100" })).Matches("^[a-zA-Z0-9()������������ ]*$").WithMessage(MustBeOnlyletter.PrepareRedisMessage(messageParameters: new object[] { "�sim" }));
        }
    }
}