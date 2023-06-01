using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Common.BusinessAspects;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Utilities.Requests;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Documents.Commands
{
    [ExcludeFromCodeCoverage]
    [SecuredOperation]
    [LogScope]
    public class CreateDocumentCommand : CreateRequestBase<Document>
    {
        public class CreateDocumentCommandHandler : CreateHandlerBase<Document, CreateDocumentCommand>
        {
            public CreateDocumentCommandHandler(IDocumentRepository documentRepository) : base(documentRepository)
            {
            }
        }
    }
}

