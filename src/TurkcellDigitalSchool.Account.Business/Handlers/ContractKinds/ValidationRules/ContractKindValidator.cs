using FluentValidation;
using TurkcellDigitalSchool.Account.Business.Handlers.ContractKinds.Commands;
using TurkcellDigitalSchool.Common.Constants;
using TurkcellDigitalSchool.Common.Helpers;
using TurkcellDigitalSchool.Core.CustomAttribute;
using TurkcellDigitalSchool.Core.Enums;

namespace TurkcellDigitalSchool.Account.Business.Handlers.ContractKinds.ValidationRules
{

    [MessageClassAttr("D�k�man T�r� Ekleme Do�rulay�c�s�")]
    public class CreateContractKindValidator : AbstractValidator<CreateContractKindCommand>
    {
        [MessageConstAttr(MessageCodeType.Error, "Ad,D�k�man T�r�")]
        private static string FieldIsNotNullOrEmpty = Messages.FieldIsNotNullOrEmpty;
        public CreateContractKindValidator()
        {
            RuleFor(x => x.ContractKind.Name).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Ad" }));
            RuleFor(x => x.ContractKind.ContractTypeId).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "D�k�man T�r�" }));
        }
    }
    [MessageClassAttr("D�k�man T�r� Ekleme Do�rulay�c�s�")]
    public class UpdateContractKindValidator : AbstractValidator<UpdateContractKindCommand>
    {
        [MessageConstAttr(MessageCodeType.Error, "Id,Ad,D�k�man T�r�")]
        private static string FieldIsNotNullOrEmpty = Messages.FieldIsNotNullOrEmpty;
        public UpdateContractKindValidator()
        {
            RuleFor(x => x.ContractKind.Id).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Id" })); RuleFor(x => x.ContractKind.Name).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Ad" }));
            RuleFor(x => x.ContractKind.ContractTypeId).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "D�k�man T�r�" }));

       
        }
    }
}