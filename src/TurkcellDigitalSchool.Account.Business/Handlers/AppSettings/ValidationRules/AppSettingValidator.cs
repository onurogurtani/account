using FluentValidation;
using TurkcellDigitalSchool.Account.Business.Handlers.AppSettings.Commands;
using TurkcellDigitalSchool.Common.Constants;
using TurkcellDigitalSchool.Common.Helpers;
using TurkcellDigitalSchool.Core.CustomAttribute;
using TurkcellDigitalSchool.Core.Enums;

namespace TurkcellDigitalSchool.Account.Business.Handlers.AppSettings.ValidationRules
{

    [MessageClassAttr("Uygulama Ayarlarý Ekleme Doðrulayýcýsý")]
    public class CreateAppSettingValidator : AbstractValidator<CreateAppSettingCommand>
    {
        [MessageConstAttr(MessageCodeType.Error, "Kod,Ad,Durum")]
        private static string FieldIsNotNullOrEmpty = Messages.FieldIsNotNullOrEmpty;
        public CreateAppSettingValidator()
        {
            RuleFor(x => x.Entity.Code).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Kod" }));
            RuleFor(x => x.Entity.Name).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Ad" }));
            RuleFor(x => x.Entity.RecordStatus).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Durum" }));

        }
    }
    [MessageClassAttr("Uygulama Ayarlarý Güncelleme Doðrulayýcýsý")]
    public class UpdateAppSettingValidator : AbstractValidator<UpdateAppSettingCommand>
    {
        [MessageConstAttr(MessageCodeType.Error, "Id")]
        private static string FieldIsNotNullOrEmpty = Messages.FieldIsNotNullOrEmpty;
        public UpdateAppSettingValidator()
        {
            RuleFor(x => x.Entity.Id).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Id" }));
        }
    }

    [MessageClassAttr("Þifre Kurallarý Doðrulayýcýsý")]
    public class SetPasswordRuleAndPeriodValueValidator : AbstractValidator<SetPasswordRuleAndPeriodValueCommand>
    {
        [MessageConstAttr(MessageCodeType.Error, "Minimum Karakter,Maksimum Karakter")]
        private static string FieldIsNotNullOrEmpty = Messages.FieldIsNotNullOrEmpty;
        private static string MinCharCanNotBeGreaterThanMaxChar = Messages.MinCharCanNotBeGreaterThanMaxChar;
        public SetPasswordRuleAndPeriodValueValidator()
        {
            RuleFor(x => x.MinCharacter).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Minimum Karakter" }));
            RuleFor(x => x.MaxCharacter).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Maksimum Karakter" }));
            RuleFor(x => x.MaxCharacter).GreaterThan(x => x.MinCharacter).WithMessage(MinCharCanNotBeGreaterThanMaxChar);
        }
    }

}
