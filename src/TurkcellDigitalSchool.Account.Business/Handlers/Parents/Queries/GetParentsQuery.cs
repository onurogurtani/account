using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Utilities.Requests;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Parents.Queries
{
    [ExcludeFromCodeCoverage]
    public class GetParentsQuery : QueryByFilterRequestBase<Parent>
    {
        public class GetParentsQueryHandler : QueryByFilterRequestHandlerBase<Parent>
        {
            /// <summary>
            /// Get Parents
            /// </summary>
            public GetParentsQueryHandler(IParentRepository repository) : base(repository)
            {
            }
        }
    }
}