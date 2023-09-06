using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TurkcellDigitalSchool.Account.Business.Handlers.Authorizations.Commands;
using TurkcellDigitalSchool.Account.Business.Helpers;
using TurkcellDigitalSchool.Core.Common.Constants;
using TurkcellDigitalSchool.Core.Common.Helpers;
using TurkcellDigitalSchool.Core.CustomAttribute;
using TurkcellDigitalSchool.Core.Enums;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Authorizations.ValidationRules
{
    [MessageClassAttr("Visitor Kayıtol Doğrulayıcı")]
    public class VisitorRegisterValidator : AbstractValidator<VisitorRegisterCommand>
    {
        [MessageConstAttr(MessageCodeType.Error, "Email, Telefon, Ad, Soyad")]
        private static string FieldIsNotNullOrEmpty = Messages.FieldIsNotNullOrEmpty;
        [MessageConstAttr(MessageCodeType.Error, "Email")]
        private static string EmailIsNotValid = Messages.EmailIsNotValid;
        public VisitorRegisterValidator()
        {
            RuleFor(x => x.Email).EmailAddress().When(w => !string.IsNullOrEmpty(w.Email)).WithMessage(EmailIsNotValid.PrepareRedisMessage(messageParameters: new object[] { "Email" }));
            RuleFor(x => x.MobilePhones).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Telefon" }));
            RuleFor(x => x.Name).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Ad" }));
            RuleFor(x => x.SurName).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Soyad" }));

        }
    }

    [MessageClassAttr("Visitor Otp Kodları Doğrulama")]
    public class VerifyVisitorRegisterValidator : AbstractValidator<VerifyVisitorRegisterCommand>
    {
        [MessageConstAttr(MessageCodeType.Error, "Session kod, Sms Otp Kod, Email Otp kod")]
        private static string FieldIsNotNullOrEmpty = Messages.FieldIsNotNullOrEmpty;
        public VerifyVisitorRegisterValidator()
        {
            RuleFor(x => x.SessionCode).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Session kod" }));
            RuleFor(x => x.SmsOtpCode).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Sms Otp Kod" }));
            RuleFor(x => x.EmailOtpCode).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Email Otp kod" }));

        }
    }
}
