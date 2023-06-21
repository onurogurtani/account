using FluentValidation;
using TurkcellDigitalSchool.Account.Business.Handlers.Parents.Commands;
using TurkcellDigitalSchool.Core.Common.Constants;
using TurkcellDigitalSchool.Core.Common.Helpers;
using TurkcellDigitalSchool.Core.CustomAttribute;
using TurkcellDigitalSchool.Core.Enums;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Parents.ValidationRules
{

    public class CreateParentValidator : AbstractValidator<CreateParentCommand>
    {
        public CreateParentValidator()
        {
        }
    }

    [MessageClassAttr("Veli Güncelleme Doðrulayýcýsý")]
    public class UpdateParentValidator : AbstractValidator<UpdateParentCommand>
    {
        [MessageConstAttr(MessageCodeType.Error, "Id")]
        private static string FieldIsNotNullOrEmpty = Messages.FieldIsNotNullOrEmpty;
        public UpdateParentValidator()
        {
            RuleFor(x => x.Entity.Id).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Id" }));
        }
    }
}