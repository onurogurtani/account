using FluentValidation;
using TurkcellDigitalSchool.Account.Business.Handlers.Documents.Commands;
using TurkcellDigitalSchool.Common.Constants;
using TurkcellDigitalSchool.Common.Helpers;
using TurkcellDigitalSchool.Core.CustomAttribute;
using TurkcellDigitalSchool.Core.Enums;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Documents.ValidationRules
{

    [MessageClassAttr("D�k�man Ekleme Do�rulay�c�s�")]
    public class CreateDocumentValidator : AbstractValidator<CreateDocumentCommand>
    {
        [MessageConstAttr(MessageCodeType.Error, "Durum")]
        private static string FieldIsNotNullOrEmpty = Messages.FieldIsNotNullOrEmpty;
        public CreateDocumentValidator()
        {
            RuleFor(x => x.Entity.RecordStatus).NotEmpty().WithMessage(FieldIsNotNullOrEmpty.PrepareRedisMessage(messageParameters: new object[] { "Durum" }));
        }
    }
    [MessageClassAttr("D�k�man D�zenleme Do�rulay�c�s�")]
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