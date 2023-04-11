using FluentValidation;
using TurkcellDigitalSchool.Account.Business.Handlers.Roles.Commands;
using TurkcellDigitalSchool.Common.Constants;
using TurkcellDigitalSchool.Common.Helpers;
using TurkcellDigitalSchool.Core.CustomAttribute;
using TurkcellDigitalSchool.Core.Enums;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Roles.ValidationRules
{
    [MessageClassAttr("Rol Ekleme Doðrulayýcýsý")]
    public class CreateRoleValidator : AbstractValidator<CreateRoleCommand>
    {
        [MessageConstAttr(MessageCodeType.Error, "Ýsim,Kullanýcý Tipi,Rol Yetki")]
        private static string FieldIsNotNullOrEmpty = Messages.FieldIsNotNullOrEmpty;
        [MessageConstAttr(MessageCodeType.Error, "2,100")]
        private static string NumberMustBeCharacterLength = Messages.NumberMustBeCharacterLength;
        [MessageConstAttr(MessageCodeType.Error, "Ýsim")]
        private static string MustBeOnlyletter = Constants.Messages.MustBeOnlyLetter;
        [MessageConstAttr(MessageCodeType.Error)]
        private static string IsInEnumValue = Messages.IsInEnumValue;
        public CreateRoleValidator()
        {
            RuleFor(x => x.Role.Name).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Ýsim" })).Length(2, 100).WithMessage(NumberMustBeCharacterLength.PrepareRedisMessage(messageParameters: new object[] { "2", "100" })).Matches("^[a-zA-Z0-9()ýðüþöçÝÐÜÞÖÇ ]*$").WithMessage(MustBeOnlyletter.PrepareRedisMessage(messageParameters: new object[] { "Ýsim" }));
            RuleFor(x => x.Role.UserType).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Kullanýcý Tipi" })).IsInEnum().WithMessage(IsInEnumValue);
            RuleFor(x => x.Role.RoleClaims).NotEmpty().Must(x => x.Count > 0).WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Rol Yetki" }));
        }
    }

    [MessageClassAttr("Rol Güncelleme Doðrulayýcýsý")]
    public class UpdateRoleValidator : AbstractValidator<UpdateRoleCommand>
    {
        [MessageConstAttr(MessageCodeType.Error, "Id,Ýsim,Kullanýcý Tipi,Rol Yetki")]
        private static string FieldIsNotNullOrEmpty = Messages.FieldIsNotNullOrEmpty;
        [MessageConstAttr(MessageCodeType.Error, "2,100")]
        private static string NumberMustBeCharacterLength = Messages.NumberMustBeCharacterLength;
        [MessageConstAttr(MessageCodeType.Error, "Ýsim")]
        private static string MustBeOnlyletter = Constants.Messages.MustBeOnlyLetter;
        [MessageConstAttr(MessageCodeType.Error)]
        private static string IsInEnumValue = Messages.IsInEnumValue;
        public UpdateRoleValidator()
        {
            RuleFor(x => x.Role.Id).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Id" }));
            RuleFor(x => x.Role.Name).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Ýsim" })).Length(2, 100).WithMessage(NumberMustBeCharacterLength.PrepareRedisMessage(messageParameters: new object[] { "2", "100" })).Matches("^[a-zA-Z0-9()ýðüþöçÝÐÜÞÖÇ ]*$").WithMessage(MustBeOnlyletter.PrepareRedisMessage(messageParameters: new object[] { "Ýsim" }));
            RuleFor(x => x.Role.UserType).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Kullanýcý Tipi" })).IsInEnum().WithMessage(IsInEnumValue);
            RuleFor(x => x.Role.RoleClaims).NotEmpty().Must(x => x.Count > 0).WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Rol Yetki" }));
        }
    }

    [MessageClassAttr("Rol Kopyalama Doðrulayýcýsý")]
    public class RoleCopyValidator : AbstractValidator<RoleCopyCommand>
    {
        [MessageConstAttr(MessageCodeType.Error, "Id,Ýsim")]
        private static string FieldIsNotNullOrEmpty = Messages.FieldIsNotNullOrEmpty;
        [MessageConstAttr(MessageCodeType.Error, "2,100")]
        private static string NumberMustBeCharacterLength = Messages.NumberMustBeCharacterLength;
        [MessageConstAttr(MessageCodeType.Error, "Ýsim")]
        private static string MustBeOnlyletter = Constants.Messages.MustBeOnlyLetter;
        public RoleCopyValidator()
        {
            RuleFor(x => x.RoleId).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Id" }));
            RuleFor(x => x.RoleName).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Ýsim" })).Length(2, 100).WithMessage(NumberMustBeCharacterLength.PrepareRedisMessage(messageParameters: new object[] { "2", "100" })).Matches("^[a-zA-Z0-9()ýðüþöçÝÐÜÞÖÇ ]*$").WithMessage(MustBeOnlyletter.PrepareRedisMessage(messageParameters: new object[] { "Ýsim" }));
        }
    }
}