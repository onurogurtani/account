using FluentValidation;
using TurkcellDigitalSchool.Account.Business.Handlers.Users.Commands;
using TurkcellDigitalSchool.Common.Constants;
using TurkcellDigitalSchool.Common.Helpers;
using TurkcellDigitalSchool.Core.CustomAttribute;
using TurkcellDigitalSchool.Core.Enums;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Users.ValidationRules
{
    [MessageClassAttr("Kullan�c� Ekleme Do�rulay�c�s�")]
    public class AddUserValidator : AbstractValidator<AddUserCommand>
    {
        [MessageConstAttr(MessageCodeType.Error, "Kullan�c� Tipi,Ad,Soyad,TCKN,Email")]
        private static string RequiredField = Messages.RequiredField;
        [MessageConstAttr(MessageCodeType.Error, "Email")]
        private static string EmailIsNotValid = Messages.EmailIsNotValid;
        public AddUserValidator()
        {
            RuleFor(x => x.UserTypeId).NotEmpty().WithMessage(RequiredField.PrepareRedisMessage(messageParameters: new object[] { "Kullan�c� Tipi" }));
            RuleFor(x => x.Name).NotEmpty().WithMessage(RequiredField.PrepareRedisMessage(messageParameters: new object[] { "Ad" }));
            RuleFor(x => x.SurName).NotEmpty().WithMessage(RequiredField.PrepareRedisMessage(messageParameters: new object[] { "Soyad" }));
            RuleFor(x => x.CitizenId).NotEmpty().WithMessage(RequiredField.PrepareRedisMessage(messageParameters: new object[] { "TCKN" }));
            RuleFor(x => x.MobilePhones).NotEmpty().WithMessage(RequiredField.PrepareRedisMessage(messageParameters: new object[] { "Telefon Numaras�" }));
            RuleFor(x => x.Email).EmailAddress().When(w => !string.IsNullOrEmpty(w.Email)).WithMessage(EmailIsNotValid.PrepareRedisMessage(messageParameters: new object[] { "Email" }));
            RuleFor(x => x.MobilePhones).NumberMustBe10Digit().When(w => !string.IsNullOrEmpty(w.MobilePhones));
        }
    }

    [MessageClassAttr("Kullan�c� Durum Do�rulay�c�s�")]
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