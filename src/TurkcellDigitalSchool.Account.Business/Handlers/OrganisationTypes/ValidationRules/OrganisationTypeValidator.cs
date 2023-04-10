using FluentValidation;
using TurkcellDigitalSchool.Account.Business.Handlers.OrganisationTypes.Commands;
using TurkcellDigitalSchool.Common.Constants;
using TurkcellDigitalSchool.Common.Helpers;
using TurkcellDigitalSchool.Core.CustomAttribute;
using TurkcellDigitalSchool.Core.Enums;

namespace TurkcellDigitalSchool.Account.Business.Handlers.OrganisationTypes.ValidationRules
{
    [MessageClassAttr("Kurum Türü Ekleme Doðrulayýcýsý")]
    public class CreateOrganisationTypeValidator : AbstractValidator<CreateOrganisationTypeCommand>
    {
        [MessageConstAttr(MessageCodeType.Error, "Ýsim")]
        private static string FieldIsNotNullOrEmpty = Messages.FieldIsNotNullOrEmpty;
        public CreateOrganisationTypeValidator()
        {
            RuleFor(x => x.OrganisationType.Name).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Ýsim" }));
        }
    }

    [MessageClassAttr("Kurum Türü Güncelleme Doðrulayýcýsý")]
    public class UpdateOrganisationTypeValidator : AbstractValidator<UpdateOrganisationTypeCommand>
    {
        [MessageConstAttr(MessageCodeType.Error, "Id,Ýsim")]
        private static string FieldIsNotNullOrEmpty = Messages.FieldIsNotNullOrEmpty;
        public UpdateOrganisationTypeValidator()
        {
            RuleFor(x => x.OrganisationType.Id).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Id" }));
            RuleFor(x => x.OrganisationType.Name).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Ýsim" }));
        }
    }
}