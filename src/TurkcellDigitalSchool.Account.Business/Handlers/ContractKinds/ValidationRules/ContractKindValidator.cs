using FluentValidation;
using TurkcellDigitalSchool.Account.Business.Handlers.ContractKinds.Commands;
using TurkcellDigitalSchool.Common.Constants;
using TurkcellDigitalSchool.Common.Helpers;
using TurkcellDigitalSchool.Core.CustomAttribute;
using TurkcellDigitalSchool.Core.Enums;

namespace TurkcellDigitalSchool.Account.Business.Handlers.ContractKinds.ValidationRules
{

    [MessageClassAttr("Döküman Türü Ekleme Doðrulayýcýsý")]
    public class CreateContractKindValidator : AbstractValidator<CreateContractKindCommand>
    {
        [MessageConstAttr(MessageCodeType.Error, "Ad,Döküman Türü")]
        private static string FieldIsNotNullOrEmpty = Messages.FieldIsNotNullOrEmpty;
        public CreateContractKindValidator()
        {
            RuleFor(x => x.ContractKind.Name).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Ad" }));
            RuleFor(x => x.ContractKind.ContractTypeId).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Döküman Türü" }));
        }
    }
    [MessageClassAttr("Döküman Türü Ekleme Doðrulayýcýsý")]
    public class UpdateContractKindValidator : AbstractValidator<UpdateContractKindCommand>
    {
        [MessageConstAttr(MessageCodeType.Error, "Id,Ad,Döküman Türü")]
        private static string FieldIsNotNullOrEmpty = Messages.FieldIsNotNullOrEmpty;
        public UpdateContractKindValidator()
        {
            RuleFor(x => x.ContractKind.Id).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Id" })); RuleFor(x => x.ContractKind.Name).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Ad" }));
            RuleFor(x => x.ContractKind.ContractTypeId).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Döküman Türü" }));

       
        }
    }
}