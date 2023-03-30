using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Utilities.Requests;
using TurkcellDigitalSchool.Entities.Concrete;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Parents.Queries
{
    [ExcludeFromCodeCoverage]
    public class GetParentQuery : QueryByIdRequestBase<Parent>
    {
        public class GetParentQueryHandler : QueryByIdRequestHandlerBase<Parent>
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
