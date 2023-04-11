using FluentValidation;
using TurkcellDigitalSchool.Account.Business.Handlers.OrganisationLogos.Commands;
using TurkcellDigitalSchool.Common.Constants;
using TurkcellDigitalSchool.Common.Helpers;
using TurkcellDigitalSchool.Core.CustomAttribute;
using TurkcellDigitalSchool.Core.Enums;

namespace TurkcellDigitalSchool.Account.Business.Handlers.OrganisationLogos.ValidationRules
{

    [MessageClassAttr("Organizasyon Logo Ekleme Doðrulayýcýsý")]
    public class CreateOrganisationLogoValidator : AbstractValidator<CreateOrganisationLogoCommand>
    {
        [MessageConstAttr(MessageCodeType.Error, "Görsel")]
        private static string FieldIsNotNullOrEmpty = Messages.FieldIsNotNullOrEmpty;
        public CreateOrganisationLogoValidator()
        {
            RuleFor(x => x.Image).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Görsel" }));
        }
    }
    [MessageClassAttr("Organizasyon Logo Düzenleme Doðrulayýcýsý")]
    public class UpdateOrganisationLogoValidator : AbstractValidator<UpdateOrganisationLogoCommand>
    {
        [MessageConstAttr(MessageCodeType.Error, "Id,Görsel")]
        private static string FieldIsNotNullOrEmpty = Messages.FieldIsNotNullOrEmpty;
        public UpdateOrganisationLogoValidator()
        {
            RuleFor(x => x.Id).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Id" }));
            RuleFor(x => x.Image).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Görsel" }));
        }
    }
}