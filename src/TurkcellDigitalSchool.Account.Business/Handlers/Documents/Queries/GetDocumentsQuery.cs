using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Utilities.Requests;
using TurkcellDigitalSchool.Entities.Concrete;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Documents.Queries
{
    [ExcludeFromCodeCoverage]
    public class GetDocumentsQuery : QueryByFilterRequestBase<Document>
    {
        public class GetDocumentsQueryHandler : QueryByFilterRequestHandlerBase<Document>
        {
            public GetDocumentsQueryHandler(IDocumentRepository repository) : base(repository)
            {
            }
        }
    }
}