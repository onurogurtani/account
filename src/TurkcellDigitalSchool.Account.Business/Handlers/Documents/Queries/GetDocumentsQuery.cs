using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Common.Handlers;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Utilities.Requests;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Documents.Queries
{
    [ExcludeFromCodeCoverage]
    [SecuredOperationScope]
    [LogScope]
    public class GetDocumentsQuery : QueryByFilterRequestBase<Document>
    {
        public class GetDocumentsQueryHandler : QueryByFilterRequestHandlerBase<Document, GetDocumentsQuery>
        {
            public GetDocumentsQueryHandler(IDocumentRepository repository) : base(repository)
            {
            }
        }
    }
}