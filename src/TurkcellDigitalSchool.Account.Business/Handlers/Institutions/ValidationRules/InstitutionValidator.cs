using FluentValidation;
using TurkcellDigitalSchool.Account.Business.Handlers.Institutions.Commands;
using TurkcellDigitalSchool.Common.Constants;
using TurkcellDigitalSchool.Common.Helpers;
using TurkcellDigitalSchool.Core.CustomAttribute;
using TurkcellDigitalSchool.Core.Enums;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Institutions.ValidationRules
{
    [MessageClassAttr("Kurum Ekleme Doðrulayýcýsý")]
    public class CreateInstitutionValidator : AbstractValidator<CreateInstitutionCommand>
    {
        [MessageConstAttr(MessageCodeType.Error, "Ad")]
        private static string FieldIsNotNullOrEmpty = Messages.FieldIsNotNullOrEmpty;
        public CreateInstitutionValidator()
        {
            RuleFor(x => x.Entity.Name).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Ad" }));
        }
    }
    [MessageClassAttr("Kurum Düzenleme Doðrulayýcýsý")]
    public class UpdateInstitutionValidator : AbstractValidator<UpdateInstitutionCommand>
    {
        [MessageConstAttr(MessageCodeType.Error, "Id,Ad")]
        private static string FieldIsNotNullOrEmpty = Messages.FieldIsNotNullOrEmpty;
        public UpdateInstitutionValidator()
        {
            RuleFor(x => x.Entity.Id).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Id" }));
            RuleFor(x => x.Entity.Name).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Ad" }));
        }
    }
}