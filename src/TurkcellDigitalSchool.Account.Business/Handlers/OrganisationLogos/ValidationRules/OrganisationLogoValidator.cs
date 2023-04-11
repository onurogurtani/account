using FluentValidation;
using TurkcellDigitalSchool.Account.Business.Handlers.OrganisationLogos.Commands;
using TurkcellDigitalSchool.Common.Constants;
using TurkcellDigitalSchool.Common.Helpers;
using TurkcellDigitalSchool.Core.CustomAttribute;
using TurkcellDigitalSchool.Core.Enums;

namespace TurkcellDigitalSchool.Account.Business.Handlers.OrganisationLogos.ValidationRules
{

    [MessageClassAttr("Organizasyon Logo Ekleme Do�rulay�c�s�")]
    public class CreateOrganisationLogoValidator : AbstractValidator<CreateOrganisationLogoCommand>
    {
        [MessageConstAttr(MessageCodeType.Error, "G�rsel")]
        private static string FieldIsNotNullOrEmpty = Messages.FieldIsNotNullOrEmpty;
        public CreateOrganisationLogoValidator()
        {
            RuleFor(x => x.Image).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "G�rsel" }));
        }
    }
    [MessageClassAttr("Organizasyon Logo D�zenleme Do�rulay�c�s�")]
    public class UpdateOrganisationLogoValidator : AbstractValidator<UpdateOrganisationLogoCommand>
    {
        [MessageConstAttr(MessageCodeType.Error, "Id,G�rsel")]
        private static string FieldIsNotNullOrEmpty = Messages.FieldIsNotNullOrEmpty;
        public UpdateOrganisationLogoValidator()
        {
            RuleFor(x => x.Id).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Id" }));
            RuleFor(x => x.Image).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "G�rsel" }));
        }
    }
}