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

    public class DeleteDocumentCommand : DeleteRequestBase<Document>
    {
        public class DeleteRequestDocumentCommandHandler : DeleteRequestHandlerBase<Document, DeleteDocumentCommand>
        {
            public DeleteRequestDocumentCommandHandler(IDocumentRepository repository) : base(repository)
            {
            }
        }
    }
}

