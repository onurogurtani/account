using FluentValidation;
using TurkcellDigitalSchool.Account.Business.Handlers.Documents.Commands;
using TurkcellDigitalSchool.Common.Constants;
using TurkcellDigitalSchool.Common.Helpers;
using TurkcellDigitalSchool.Core.CustomAttribute;
using TurkcellDigitalSchool.Core.Enums;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Documents.ValidationRules
{

    [MessageClassAttr("Döküman Ekleme Doðrulayýcýsý")]
    public class CreateDocumentValidator : AbstractValidator<CreateDocumentCommand>
    {
        [MessageConstAttr(MessageCodeType.Error, "Durum")]
        private static string FieldIsNotNullOrEmpty = Messages.FieldIsNotNullOrEmpty;
        public CreateDocumentValidator()
        {
            RuleFor(x => x.Entity.RecordStatus).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Durum" }));
        }
    }
    [MessageClassAttr("Döküman Düzenleme Doðrulayýcýsý")]
    public class UpdateDocumentValidator : AbstractValidator<UpdateDocumentCommand>
    {
        [MessageConstAttr(MessageCodeType.Error, "Id")]
        private static string FieldIsNotNullOrEmpty = Messages.FieldIsNotNullOrEmpty;
        public UpdateDocumentValidator()
        {
            RuleFor(x => x.Entity.Id).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Id" }));
        }
    }
}