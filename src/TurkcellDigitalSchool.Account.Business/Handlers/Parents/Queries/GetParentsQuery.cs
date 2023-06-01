using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Common.BusinessAspects;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Utilities.Requests;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Parents.Queries
{
    [ExcludeFromCodeCoverage]
    [SecuredOperation]
    [LogScope]

    public class GetParentsQuery : QueryByFilterRequestBase<Parent>
    {
        public class GetParentsQueryHandler : QueryByFilterBase<Parent, GetParentsQuery>
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