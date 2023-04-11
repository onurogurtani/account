using FluentValidation;
using TurkcellDigitalSchool.Account.Business.Handlers.ContractTypes.Commands;
using TurkcellDigitalSchool.Common.Constants;
using TurkcellDigitalSchool.Common.Helpers;
using TurkcellDigitalSchool.Core.CustomAttribute;
using TurkcellDigitalSchool.Core.Enums;

namespace TurkcellDigitalSchool.Account.Business.Handlers.ContractTypes.ValidationRules
{

    [MessageClassAttr("Döküman Tipi Ekleme Doğrulayıcısı")]
    public class CreateContractTypeValidator : AbstractValidator<CreateContractTypeCommand>
    {
        [MessageConstAttr(MessageCodeType.Error, "Ad")]
        private static string FieldIsNotNullOrEmpty = Messages.FieldIsNotNullOrEmpty; 
        public CreateContractTypeValidator()
        {
            RuleFor(x => x.ContractType.Name).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Ad" }));
        }
    }
    [MessageClassAttr("Döküman Tipi Düzenleme Doğrulayıcısı")]
    public class UpdateContractTypeValidator : AbstractValidator<UpdateContractTypeCommand>
    {
        [MessageConstAttr(MessageCodeType.Error, "Id,Ad")]
        private static string FieldIsNotNullOrEmpty = Messages.FieldIsNotNullOrEmpty;
        public UpdateContractTypeValidator()
        {
            RuleFor(x => x.ContractType.Name).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Id" }));
            RuleFor(x => x.ContractType.Name).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Ad" }));
        }
    }
}