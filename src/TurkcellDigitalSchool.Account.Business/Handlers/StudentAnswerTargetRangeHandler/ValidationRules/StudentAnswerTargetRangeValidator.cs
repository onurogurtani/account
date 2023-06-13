using FluentValidation;
using TurkcellDigitalSchool.Account.Business.Handlers.StudentAnswerTargetRangeHandler.Commands;
using TurkcellDigitalSchool.Core.Common.Constants;
using TurkcellDigitalSchool.Core.Common.Helpers;
using TurkcellDigitalSchool.Core.CustomAttribute;
using TurkcellDigitalSchool.Core.Enums;

namespace TurkcellDigitalSchool.Account.Business.Handlers.StudentAnswerTargetRangeHandler.ValidationRules
{
    [MessageClassAttr("Öğrenci Net Hedef Aralığı Ekleme Doğrulayıcısı")]
    public class CreateStudentAnswerTargetRangeValidator : AbstractValidator<CreateStudentAnswerTargetRangeCommand>
    {
        [MessageConstAttr(MessageCodeType.Error, "Kullanıcı,Paket,Minimum Hedef,Maximum Hedef")]
        private static string FieldIsNotNullOrEmpty = Messages.FieldIsNotNullOrEmpty;

        public CreateStudentAnswerTargetRangeValidator()
        {
            RuleFor(x => x.UserId).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Kullanıcı" }));
            RuleFor(x => x.PackageId).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Paket" }));
            RuleFor(x => x.TargetRangeMin).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Minimum Hedef" }));
            RuleFor(x => x.TargetRangeMax).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Maximum Hedef" }));
        }
    }

    [MessageClassAttr("Öğrenci Net Hedef Aralığı Güncelleme Doğrulayıcısı")]
    public class UpdateStudentAnswerTargetRangeValidator : AbstractValidator<UpdateStudentAnswerTargetRangeCommand>
    {
        [MessageConstAttr(MessageCodeType.Error, "Id,Minimum Hedef,Maximum Hedef")]
        private static string FieldIsNotNullOrEmpty = Messages.FieldIsNotNullOrEmpty;
        public UpdateStudentAnswerTargetRangeValidator()
        {
            RuleFor(x => x.Id).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Id" }));
            RuleFor(x => x.TargetRangeMin).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Minimum Hedef" }));
            RuleFor(x => x.TargetRangeMax).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Maximum Hedef" }));
        }
    }

    [MessageClassAttr("Öğrenci Net Hedef Aralığı Silme Doğrulayıcısı")]
    public class DeleteStudentAnswerTargetRangeValidator : AbstractValidator<DeleteStudentAnswerTargetRangeCommand>
    {
        [MessageConstAttr(MessageCodeType.Error, "Id")]
        private static string FieldIsNotNullOrEmpty = Messages.FieldIsNotNullOrEmpty;
        public DeleteStudentAnswerTargetRangeValidator()
        {
            RuleFor(x => x.Id).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Id" }));
        }
    }
}
