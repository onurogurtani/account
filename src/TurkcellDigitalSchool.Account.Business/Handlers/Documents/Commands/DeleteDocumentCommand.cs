using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Utilities.Requests;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Documents.Commands
{
    [ExcludeFromCodeCoverage]
    public class DeleteDocumentCommand : DeleteRequestBase<Document>
    {
        public class DeleteDocumentCommandHandler : DeleteRequestHandlerBase<Document>
        {
            public DeleteDocumentCommandHandler(IDocumentRepository repository) : base(repository)
            {
            }
        }
    }
}

