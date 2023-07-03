using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Common.Handlers;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Utilities.Requests;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Parents.Queries
{
    [ExcludeFromCodeCoverage]
     
    [LogScope]

    public class GetParentsQuery : QueryByFilterRequestBase<Parent>
    {
        public class GetParentsQueryHandler : QueryByFilterRequestHandlerBase<Parent, GetParentsQuery>
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