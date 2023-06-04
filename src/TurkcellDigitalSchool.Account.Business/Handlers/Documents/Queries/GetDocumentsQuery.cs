using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Common.BusinessAspects;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Utilities.Requests;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Documents.Queries
{
    [ExcludeFromCodeCoverage]
    [SecuredOperation]
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