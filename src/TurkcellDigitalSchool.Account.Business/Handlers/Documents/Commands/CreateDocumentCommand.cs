using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Utilities.Requests;
using TurkcellDigitalSchool.Entities.Concrete;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Documents.Commands
{
    [ExcludeFromCodeCoverage]
    public class CreateDocumentCommand : CreateRequestBase<Document>
    {
        public class CreateDocumentCommandHandler : CreateRequestHandlerBase<Document>
        {
            public CreateDocumentCommandHandler(IDocumentRepository documentRepository) : base(documentRepository)
            {
            }
        }
    }
}
