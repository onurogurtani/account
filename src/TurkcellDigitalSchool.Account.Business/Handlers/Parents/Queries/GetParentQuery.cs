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

    public class GetParentQuery : QueryByIdRequestBase<Parent>
    {
        public class GetParentQueryHandler : QueryByIdRequestHandlerBase<Parent, GetParentQuery>
        {
            /// <summary>
            /// Get Parent
            /// </summary>
            public GetParentQueryHandler(IParentRepository parentRepository) : base(parentRepository)
            {
            }
        }
    }
}
