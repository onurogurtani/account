using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Common.Handlers;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Utilities.Requests;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Documents.Commands
{
    [ExcludeFromCodeCoverage]
    [SecuredOperationScope]
    [LogScope]
    public class CreateDocumentCommand : CreateRequestBase<Document>
    {
        public class CreateRequestDocumentCommandHandler : CreateRequestHandlerBase<Document, CreateDocumentCommand>
        {
            public CreateRequestDocumentCommandHandler(IDocumentRepository documentRepository) : base(documentRepository)
            {
            }
        }
    }
}

