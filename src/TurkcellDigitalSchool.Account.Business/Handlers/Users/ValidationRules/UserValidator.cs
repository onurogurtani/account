using FluentValidation;
using TurkcellDigitalSchool.Account.Business.Handlers.Users.Commands;
using TurkcellDigitalSchool.Common.Constants;
using TurkcellDigitalSchool.Common.Helpers;
using TurkcellDigitalSchool.Core.CustomAttribute;
using TurkcellDigitalSchool.Core.Enums;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Users.ValidationRules
{
    [MessageClassAttr("Kullanýcý Ekleme Doðrulayýcýsý")]
    public class AddUserValidator : AbstractValidator<AddUserCommand>
    {
        [MessageConstAttr(MessageCodeType.Error, "Kullanýcý Tipi,Ad,Soyad,TCKN,Email")]
        private static string RequiredField = Messages.RequiredField;
        [MessageConstAttr(MessageCodeType.Error, "Email")]
        private static string EmailIsNotValid = Messages.EmailIsNotValid;
        public AddUserValidator()
        {
            RuleFor(x => x.UserTypeId).NotEmpty().WithMessage(RequiredField.PrepareRedisMessage(messageParameters: new object[] { "Kullanýcý Tipi" }));
            RuleFor(x => x.Name).NotEmpty().WithMessage(RequiredField.PrepareRedisMessage(messageParameters: new object[] { "Ad" }));
            RuleFor(x => x.SurName).NotEmpty().WithMessage(RequiredField.PrepareRedisMessage(messageParameters: new object[] { "Soyad" }));
            RuleFor(x => x.CitizenId).NotEmpty().When(w => w.UserTypeId == UserType.Parent).WithMessage(RequiredField.PrepareRedisMessage(messageParameters: new object[] { "TCKN" }));
            RuleFor(x => x.MobilePhones).NotEmpty().When(w => w.UserTypeId == UserType.Parent).WithMessage(RequiredField.PrepareRedisMessage(messageParameters: new object[] { "Telefon Numarasý" }));
            RuleFor(x => x.Email).EmailAddress().When(w => !string.IsNullOrEmpty(w.Email)).WithMessage(EmailIsNotValid.PrepareRedisMessage(messageParameters: new object[] { "Email" }));
            RuleFor(x => x.MobilePhones).NumberMustBe10Digit().When(w => !string.IsNullOrEmpty(w.MobilePhones));
        }
    }

    [MessageClassAttr("Üye Düzenleme Doðrulayýcýsý")]
    public class UpdateUserMemberValidator : AbstractValidator<UpdateUserMemberCommand>
    {
        [MessageConstAttr(MessageCodeType.Error, "Kullanýcý Tipi,Ad,Soyad,TCKN,Email")]
        private static string RequiredField = Messages.RequiredField;
        [MessageConstAttr(MessageCodeType.Error, "Email")]
        private static string EmailIsNotValid = Messages.EmailIsNotValid;
        public UpdateUserMemberValidator()
        {
            RuleFor(x => x.UserType).NotEmpty().WithMessage(RequiredField.PrepareRedisMessage(messageParameters: new object[] { "Kullanýcý Tipi" }));
            RuleFor(x => x.Name).NotEmpty().WithMessage(RequiredField.PrepareRedisMessage(messageParameters: new object[] { "Ad" }));
            RuleFor(x => x.SurName).NotEmpty().WithMessage(RequiredField.PrepareRedisMessage(messageParameters: new object[] { "Soyad" }));
            RuleFor(x => x.MobilePhones).NotEmpty().When(w => w.UserType == UserType.Parent).WithMessage(RequiredField.PrepareRedisMessage(messageParameters: new object[] { "Telefon Numarasý" }));
            RuleFor(x => x.Email).EmailAddress().When(w => !string.IsNullOrEmpty(w.Email)).WithMessage(EmailIsNotValid.PrepareRedisMessage(messageParameters: new object[] { "Email" }));
            RuleFor(x => x.MobilePhones).NumberMustBe10Digit().When(w => !string.IsNullOrEmpty(w.MobilePhones));
            RuleFor(x => x.CitizenId).NotEmpty().When(w => (w.IsPackageBuyer || w.UserType == UserType.Parent)).WithMessage(RequiredField.PrepareRedisMessage(messageParameters: new object[] { "TCKN" }));
        }
    }

    [MessageClassAttr("Kullanýcý Durum Doðrulayýcýsý")]
    public class SetStatusUserValidator : AbstractValidator<SetStatusUserCommand>
    {
        [MessageConstAttr(MessageCodeType.Error, "Id")]
        private static string RequiredField = Messages.RequiredField;
        public SetStatusUserValidator()
        {
            RuleFor(x => x.Id).NotEmpty().WithMessage(RequiredField.PrepareRedisMessage(messageParameters: new object[] { "Id" }));
        }
    }
}