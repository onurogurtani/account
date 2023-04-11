using FluentValidation;
using TurkcellDigitalSchool.Account.Business.Handlers.InstitutionTypes.Commands;
using TurkcellDigitalSchool.Common.Constants;
using TurkcellDigitalSchool.Common.Helpers;
using TurkcellDigitalSchool.Core.CustomAttribute;
using TurkcellDigitalSchool.Core.Enums;

namespace TurkcellDigitalSchool.Account.Business.Handlers.InstitutionTypes.ValidationRules
{
    [MessageClassAttr("Kurum Tipi Ekleme Doðrulayýcýsý")]
    public class CreateInstitutionTypeValidator : AbstractValidator<CreateInstitutionTypeCommand>
    {
        [MessageConstAttr(MessageCodeType.Error, "Ad")]
        private static string FieldIsNotNullOrEmpty = Messages.FieldIsNotNullOrEmpty;
        public CreateInstitutionTypeValidator()
        {
            RuleFor(x => x.Entity.Name).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Ad" }));
        }
    }
    [MessageClassAttr("Kurum Tipi  Düzenleme Doðrulayýcýsý")]
    public class UpdateInstitutionTypeValidator : AbstractValidator<UpdateInstitutionTypeCommand>
    {
        [MessageConstAttr(MessageCodeType.Error, "Id,Ad")]
        private static string FieldIsNotNullOrEmpty = Messages.FieldIsNotNullOrEmpty;
        public UpdateInstitutionTypeValidator()
        {
            RuleFor(x => x.Entity.Id).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Id" }));
            RuleFor(x => x.Entity.Name).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Ad" }));
        }
    }
}