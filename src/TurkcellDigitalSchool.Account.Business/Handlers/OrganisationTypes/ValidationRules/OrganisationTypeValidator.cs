using FluentValidation;
using TurkcellDigitalSchool.Account.Business.Handlers.OrganisationTypes.Commands;
using TurkcellDigitalSchool.Core.Common.Constants;
using TurkcellDigitalSchool.Core.Common.Helpers;
using TurkcellDigitalSchool.Core.CustomAttribute;
using TurkcellDigitalSchool.Core.Enums;

namespace TurkcellDigitalSchool.Account.Business.Handlers.OrganisationTypes.ValidationRules
{
    [MessageClassAttr("Kurum T�r� Ekleme Do�rulay�c�s�")]
    public class CreateOrganisationTypeValidator : AbstractValidator<CreateOrganisationTypeCommand>
    {
        [MessageConstAttr(MessageCodeType.Error, "�sim")]
        private static string FieldIsNotNullOrEmpty = Messages.FieldIsNotNullOrEmpty;
        public CreateOrganisationTypeValidator()
        {
            RuleFor(x => x.OrganisationType.Name).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "�sim" }));
        }
    }

    [MessageClassAttr("Kurum T�r� G�ncelleme Do�rulay�c�s�")]
    public class UpdateOrganisationTypeValidator : AbstractValidator<UpdateOrganisationTypeCommand>
    {
        [MessageConstAttr(MessageCodeType.Error, "Id,�sim")]
        private static string FieldIsNotNullOrEmpty = Messages.FieldIsNotNullOrEmpty;
        public UpdateOrganisationTypeValidator()
        {
            RuleFor(x => x.OrganisationType.Id).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Id" }));
            RuleFor(x => x.OrganisationType.Name).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "�sim" }));
        }
    }
}