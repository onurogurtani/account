using FluentValidation;
using TurkcellDigitalSchool.Account.Business.Handlers.Teachers.Commands;
using TurkcellDigitalSchool.Core.Common.Constants;
using TurkcellDigitalSchool.Core.Common.Helpers;
using TurkcellDigitalSchool.Core.CustomAttribute;
using TurkcellDigitalSchool.Core.Enums;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Teachers.ValidationRules
{
    [MessageClassAttr("��retmen Ekleme Do�rulay�c�s�")]
    public class AddTeacherValidator : AbstractValidator<AddTeacherCommand>
    {
        [MessageConstAttr(MessageCodeType.Error, "�sim,Soyisim,TCKN,Telefon Numaras�,Email")]
        private static string FieldIsNotNullOrEmpty = Messages.FieldIsNotNullOrEmpty;
        [MessageConstAttr(MessageCodeType.Error, "2,100")]
        private static string NumberMustBeCharacterLength = Messages.NumberMustBeCharacterLength;
        [MessageConstAttr(MessageCodeType.Error, "�sim,Soyisim")]
        private static string MustBeOnlyletter = Constants.Messages.MustBeOnlyLetter;
        [MessageConstAttr(MessageCodeType.Error)]
        private static string CitizenIdMust11Digits = Constants.Messages.CitizenIdMust11Digits;
        [MessageConstAttr(MessageCodeType.Error)]
        private static string EmailIsNotValid = Messages.EmailIsNotValid;
        public AddTeacherValidator()
        {
            RuleFor(x => x.Name).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "�sim" }));
            RuleFor(x => x.Name).Length(2, 100).WithMessage(NumberMustBeCharacterLength.PrepareRedisMessage(messageParameters: new object[] { "2", "100" })).Matches("^[a-zA-Z()������������ ]*$").WithMessage(MustBeOnlyletter.PrepareRedisMessage(messageParameters: new object[] { "�sim" }));
            RuleFor(x => x.SurName).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Soyisim" }));
            RuleFor(x => x.SurName).Length(2, 100).WithMessage(NumberMustBeCharacterLength.PrepareRedisMessage(messageParameters: new object[] { "2", "100" })).Matches("^[a-zA-Z()������������ ]*$").WithMessage(MustBeOnlyletter.PrepareRedisMessage(messageParameters: new object[] { "Soyisim" }));
            RuleFor(x => x.CitizenId).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "TCKN" })).Must(q => q.ToString().Length == 11).WithMessage(CitizenIdMust11Digits.PrepareRedisMessage());
            RuleFor(x => x.MobilePhones).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Telefon Numaras�" }));
            RuleFor(x => x.Email).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Email" }));
            RuleFor(x => x.Email).EmailAddress().When(w => !string.IsNullOrEmpty(w.Email)).WithMessage(EmailIsNotValid.PrepareRedisMessage());
            RuleFor(x => x.MobilePhones).NumberMustBe10Digit().When(w => !string.IsNullOrEmpty(w.MobilePhones));
        }
    }

    [MessageClassAttr("��retmen G�ncelleme Do�rulay�c�s�")]
    public class UpdateTeacherValidator : AbstractValidator<UpdateTeacherCommand>
    {
        [MessageConstAttr(MessageCodeType.Error, "�sim,Soyisim,TCKN,Telefon Numaras�,Email")]
        private static string FieldIsNotNullOrEmpty = Messages.FieldIsNotNullOrEmpty;
        [MessageConstAttr(MessageCodeType.Error, "2,100")]
        private static string NumberMustBeCharacterLength = Messages.NumberMustBeCharacterLength;
        [MessageConstAttr(MessageCodeType.Error, "�sim,Soyisim")]
        private static string MustBeOnlyletter = Constants.Messages.MustBeOnlyLetter;
        [MessageConstAttr(MessageCodeType.Error)]
        private static string CitizenIdMust11Digits = Constants.Messages.CitizenIdMust11Digits;
        [MessageConstAttr(MessageCodeType.Error)]
        private static string EmailIsNotValid = Messages.EmailIsNotValid;
        public UpdateTeacherValidator()
        {
            RuleFor(x => x.Name).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "�sim" }));
            RuleFor(x => x.Name).Length(2, 100).WithMessage(NumberMustBeCharacterLength.PrepareRedisMessage(messageParameters: new object[] { "2", "100" })).Matches("^[a-zA-Z()������������ ]*$").WithMessage(MustBeOnlyletter.PrepareRedisMessage(messageParameters: new object[] { "�sim" }));
            RuleFor(x => x.SurName).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Soyisim" }));
            RuleFor(x => x.SurName).Length(2, 100).WithMessage(NumberMustBeCharacterLength.PrepareRedisMessage(messageParameters: new object[] { "2", "100" })).Matches("^[a-zA-Z()������������ ]*$").WithMessage(MustBeOnlyletter.PrepareRedisMessage(messageParameters: new object[] { "Soyisim" }));
            RuleFor(x => x.CitizenId).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "TCKN" })).Must(q => q.ToString().Length == 11).WithMessage(CitizenIdMust11Digits.PrepareRedisMessage());
            RuleFor(x => x.MobilePhones).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Telefon Numaras�" }));
            RuleFor(x => x.Email).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Email" }));
            RuleFor(x => x.Email).EmailAddress().When(w => !string.IsNullOrEmpty(w.Email)).WithMessage(EmailIsNotValid.PrepareRedisMessage());
            RuleFor(x => x.MobilePhones).NumberMustBe10Digit().When(w => !string.IsNullOrEmpty(w.MobilePhones));
        }
    }

    [MessageClassAttr("��retmen Silme Do�rulay�c�s�")]
    public class DeleteTeacherValidator : AbstractValidator<DeleteTeacherCommand>
    {
        [MessageConstAttr(MessageCodeType.Error, "Kullan�c�,Kurum")]
        private static string FieldIsNotNullOrEmpty = Messages.FieldIsNotNullOrEmpty;
        public DeleteTeacherValidator()
        {
            RuleFor(x => x.UserId).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Kullan�c�" }));
            RuleFor(x => x.OrganisationId).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Kurum" }));
        }
    }
}