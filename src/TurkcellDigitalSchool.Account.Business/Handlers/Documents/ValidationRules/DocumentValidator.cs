using FluentValidation;
using TurkcellDigitalSchool.Account.Business.Handlers.Documents.Commands;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Documents.ValidationRules
{

    public class CreateDocumentValidator : AbstractValidator<CreateDocumentCommand>
    {
        public CreateDocumentValidator()
        {
            RuleFor(x => x.Entity.RecordStatus).NotEmpty();
        }
    }
    public class UpdateDocumentValidator : AbstractValidator<UpdateDocumentCommand>
    {
        public UpdateDocumentValidator()
        {
            RuleFor(x => x.Entity.Id).NotEmpty();
        }
    }
}