using FluentValidation;
using TurkcellDigitalSchool.Account.Business.Handlers.Educations.Commands;
using TurkcellDigitalSchool.Common.Constants;
using TurkcellDigitalSchool.Common.Helpers;
using TurkcellDigitalSchool.Core.CustomAttribute;
using TurkcellDigitalSchool.Core.Enums;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Educations.ValidationRules
{

    public class CreateEducationValidator : AbstractValidator<CreateEducationCommand>
    {
        public CreateEducationValidator()
        {
        }
    }
    [MessageClassAttr("Eðitim Bilgileri Ekleme Doðrulayýcýsý")]
    public class UpdateEducationValidator : AbstractValidator<UpdateEducationCommand>
    {
        [MessageConstAttr(MessageCodeType.Error, "Id")]
        private static string FieldIsNotNullOrEmpty = Messages.FieldIsNotNullOrEmpty;
        public UpdateEducationValidator()
        {
            RuleFor(x => x.Entity.Id).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Id" }));
        }
    }
}