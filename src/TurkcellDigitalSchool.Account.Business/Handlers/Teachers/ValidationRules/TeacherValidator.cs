using FluentValidation;
using TurkcellDigitalSchool.Account.Business.Handlers.Teachers.Commands;
using TurkcellDigitalSchool.Core.Common.Constants;
using TurkcellDigitalSchool.Core.Common.Helpers;
using TurkcellDigitalSchool.Core.CustomAttribute;
using TurkcellDigitalSchool.Core.Enums;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Teachers.ValidationRules
{
    [MessageClassAttr("Öðretmen Ekleme Doðrulayýcýsý")]
    public class AddTeacherValidator : AbstractValidator<AddTeacherCommand>
    {
        [MessageConstAttr(MessageCodeType.Error, "Ýsim,Soyisim,TCKN,Telefon Numarasý,Email")]
        private static string FieldIsNotNullOrEmpty = Messages.FieldIsNotNullOrEmpty;
        [MessageConstAttr(MessageCodeType.Error, "2,100")]
        private static string NumberMustBeCharacterLength = Messages.NumberMustBeCharacterLength;
        [MessageConstAttr(MessageCodeType.Error, "Ýsim,Soyisim")]
        private static string MustBeOnlyletter = Constants.Messages.MustBeOnlyLetter;
        [MessageConstAttr(MessageCodeType.Error)]
        private static string CitizenIdMust11Digits = Constants.Messages.CitizenIdMust11Digits;
        [MessageConstAttr(MessageCodeType.Error)]
        private static string EmailIsNotValid = Messages.EmailIsNotValid;
        public AddTeacherValidator()
        {
            RuleFor(x => x.Name).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Ýsim" }));
            RuleFor(x => x.Name).Length(2, 100).WithMessage(NumberMustBeCharacterLength.PrepareRedisMessage(messageParameters: new object[] { "2", "100" })).Matches("^[a-zA-Z()ýðüþöçÝÐÜÞÖÇ ]*$").WithMessage(MustBeOnlyletter.PrepareRedisMessage(messageParameters: new object[] { "Ýsim" }));
            RuleFor(x => x.SurName).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Soyisim" }));
            RuleFor(x => x.SurName).Length(2, 100).WithMessage(NumberMustBeCharacterLength.PrepareRedisMessage(messageParameters: new object[] { "2", "100" })).Matches("^[a-zA-Z()ýðüþöçÝÐÜÞÖÇ ]*$").WithMessage(MustBeOnlyletter.PrepareRedisMessage(messageParameters: new object[] { "Soyisim" }));
            RuleFor(x => x.CitizenId).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "TCKN" })).Must(q => q.ToString().Length == 11).WithMessage(CitizenIdMust11Digits.PrepareRedisMessage());
            RuleFor(x => x.MobilePhones).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Telefon Numarasý" }));
            RuleFor(x => x.Email).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Email" }));
            RuleFor(x => x.Email).EmailAddress().When(w => !string.IsNullOrEmpty(w.Email)).WithMessage(EmailIsNotValid.PrepareRedisMessage());
            RuleFor(x => x.MobilePhones).NumberMustBe10Digit().When(w => !string.IsNullOrEmpty(w.MobilePhones));
        }
    }

    [MessageClassAttr("Öðretmen Güncelleme Doðrulayýcýsý")]
    public class UpdateTeacherValidator : AbstractValidator<UpdateTeacherCommand>
    {
        [MessageConstAttr(MessageCodeType.Error, "Ýsim,Soyisim,TCKN,Telefon Numarasý,Email")]
        private static string FieldIsNotNullOrEmpty = Messages.FieldIsNotNullOrEmpty;
        [MessageConstAttr(MessageCodeType.Error, "2,100")]
        private static string NumberMustBeCharacterLength = Messages.NumberMustBeCharacterLength;
        [MessageConstAttr(MessageCodeType.Error, "Ýsim,Soyisim")]
        private static string MustBeOnlyletter = Constants.Messages.MustBeOnlyLetter;
        [MessageConstAttr(MessageCodeType.Error)]
        private static string CitizenIdMust11Digits = Constants.Messages.CitizenIdMust11Digits;
        [MessageConstAttr(MessageCodeType.Error)]
        private static string EmailIsNotValid = Messages.EmailIsNotValid;
        public UpdateTeacherValidator()
        {
            RuleFor(x => x.Name).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Ýsim" }));
            RuleFor(x => x.Name).Length(2, 100).WithMessage(NumberMustBeCharacterLength.PrepareRedisMessage(messageParameters: new object[] { "2", "100" })).Matches("^[a-zA-Z()ýðüþöçÝÐÜÞÖÇ ]*$").WithMessage(MustBeOnlyletter.PrepareRedisMessage(messageParameters: new object[] { "Ýsim" }));
            RuleFor(x => x.SurName).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Soyisim" }));
            RuleFor(x => x.SurName).Length(2, 100).WithMessage(NumberMustBeCharacterLength.PrepareRedisMessage(messageParameters: new object[] { "2", "100" })).Matches("^[a-zA-Z()ýðüþöçÝÐÜÞÖÇ ]*$").WithMessage(MustBeOnlyletter.PrepareRedisMessage(messageParameters: new object[] { "Soyisim" }));
            RuleFor(x => x.CitizenId).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "TCKN" })).Must(q => q.ToString().Length == 11).WithMessage(CitizenIdMust11Digits.PrepareRedisMessage());
            RuleFor(x => x.MobilePhones).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Telefon Numarasý" }));
            RuleFor(x => x.Email).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Email" }));
            RuleFor(x => x.Email).EmailAddress().When(w => !string.IsNullOrEmpty(w.Email)).WithMessage(EmailIsNotValid.PrepareRedisMessage());
            RuleFor(x => x.MobilePhones).NumberMustBe10Digit().When(w => !string.IsNullOrEmpty(w.MobilePhones));
        }
    }

    [MessageClassAttr("Öðretmen Silme Doðrulayýcýsý")]
    public class DeleteTeacherValidator : AbstractValidator<DeleteTeacherCommand>
    {
        [MessageConstAttr(MessageCodeType.Error, "Kullanýcý,Kurum")]
        private static string FieldIsNotNullOrEmpty = Messages.FieldIsNotNullOrEmpty;
        public DeleteTeacherValidator()
        {
            RuleFor(x => x.UserId).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Kullanýcý" }));
            RuleFor(x => x.OrganisationId).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Kurum" }));
        }
    }
}