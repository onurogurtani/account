using FluentValidation;
using TurkcellDigitalSchool.Account.Business.Handlers.Schools.Commands;
using TurkcellDigitalSchool.Core.Common.Constants;
using TurkcellDigitalSchool.Core.Common.Helpers;
using TurkcellDigitalSchool.Core.CustomAttribute;
using TurkcellDigitalSchool.Core.Enums;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Schools.ValidationRules
{
    [MessageClassAttr("Okul Ekleme Do�rulay�c�s�")]
    public class CreateSchoolValidator : AbstractValidator<CreateSchoolCommand>
    {
        [MessageConstAttr(MessageCodeType.Error, "�sim")]
        private static string FieldIsNotNullOrEmpty = Messages.FieldIsNotNullOrEmpty;
        public CreateSchoolValidator()
        {
            RuleFor(x => x.Entity.Name).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "�sim" }));
        }
    }

    [MessageClassAttr("Okul Ekleme Do�rulay�c�s�")]
    public class UpdateSchoolValidator : AbstractValidator<UpdateSchoolCommand>
    {
        [MessageConstAttr(MessageCodeType.Error, "Id")]
        private static string FieldIsNotNullOrEmpty = Messages.FieldIsNotNullOrEmpty;
        public UpdateSchoolValidator()
        {
            RuleFor(x => x.Entity.Id).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Id" }));
        }
    }
}