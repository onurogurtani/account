using FluentValidation;
using TurkcellDigitalSchool.Account.Business.Handlers.Admins.Commands;
using TurkcellDigitalSchool.Common.Constants;
using TurkcellDigitalSchool.Common.Helpers;
using TurkcellDigitalSchool.Core.CustomAttribute;
using TurkcellDigitalSchool.Core.Enums;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Admins.ValidationRules
{
    [MessageClassAttr("Admin Ekleme Doðrulayýcýsý")]
    public class CreateAdminValidator : AbstractValidator<CreateAdminCommand>
    {
        [MessageConstAttr(MessageCodeType.Error, "Admin TC,Kullanýcý Tipi,Ad,Soyad,Email,Telefon")]
        private static string FieldIsNotNullOrEmpty = Messages.FieldIsNotNullOrEmpty;
        [MessageConstAttr(MessageCodeType.Error)]
        private static string CitizenIdMust11Digits = Constants.Messages.CitizenIdMust11Digits;
        public CreateAdminValidator()
        {
            RuleFor(x => x.Admin.CitizenId).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Admin TC" }));
            RuleFor(x => x.Admin.CitizenId).Length(11).WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Admin TC" })).Length(11).WithMessage(CitizenIdMust11Digits);
            RuleFor(x => x.Admin.UserType).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Kullanýcý Tipi" }));
            RuleFor(x => x.Admin.Name).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Ad" }));
            RuleFor(x => x.Admin.SurName).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Soyad" }));
            RuleFor(x => x.Admin.Email).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Email" }));
            RuleFor(x => x.Admin.MobilePhones).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Telefon" }));
        }
    }
    [MessageClassAttr("Admin Düzenleme Doðrulayýcýsý")]
    public class UpdateAdminValidator : AbstractValidator<UpdateAdminCommand>
    {
        [MessageConstAttr(MessageCodeType.Error, "Id,Admin TC,Kullanýcý Tipi,Ad,Soyad,Email,Telefon")]
        private static string FieldIsNotNullOrEmpty = Messages.FieldIsNotNullOrEmpty;
        [MessageConstAttr(MessageCodeType.Error)]
        private static string CitizenIdMust11Digits = Constants.Messages.CitizenIdMust11Digits;
        public UpdateAdminValidator()
        {
            RuleFor(x => x.Admin.Id).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Id" }));
            RuleFor(x => x.Admin.CitizenId).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Admin TC" }));
            RuleFor(x => x.Admin.CitizenId).Length(11).WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Admin TC" })).Length(11).WithMessage(CitizenIdMust11Digits);
            RuleFor(x => x.Admin.UserType).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Kullanýcý Tipi" }));
            RuleFor(x => x.Admin.Name).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Ad" }));
            RuleFor(x => x.Admin.SurName).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Soyad" }));
            RuleFor(x => x.Admin.Email).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Email" }));
            RuleFor(x => x.Admin.MobilePhones).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Telefon" }));
        }
    }

    [MessageClassAttr("Admin Silme Doðrulayýcýsý")]
    public class DeleteAdminValidator : AbstractValidator<DeleteAdminCommand>
    {
        [MessageConstAttr(MessageCodeType.Error, "Id,Admin TC,Kullanýcý Tipi,Ad,Soyad,Email,Telefon")]
        private static string FieldIsNotNullOrEmpty = Messages.FieldIsNotNullOrEmpty;
        public DeleteAdminValidator()
        {
            RuleFor(x => x.Id).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Id" }));
        }
    }
    [MessageClassAttr("Admin Durum Güncelleme Doðrulayýcýsý")]
    public class SetStatusAdminValidator : AbstractValidator<SetStatusAdminCommand>
    {
        [MessageConstAttr(MessageCodeType.Error, "Id,Admin TC,Kullanýcý Tipi,Ad,Soyad,Email,Telefon")]
        private static string FieldIsNotNullOrEmpty = Messages.FieldIsNotNullOrEmpty;
        public SetStatusAdminValidator()
        {
            RuleFor(x => x.Id).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Id" }));
        }
    }
}