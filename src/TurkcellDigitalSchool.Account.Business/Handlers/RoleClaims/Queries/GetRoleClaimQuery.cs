using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Utilities.Requests;
using TurkcellDigitalSchool.Entities.Concrete.Core; 

namespace TurkcellDigitalSchool.Account.Business.Handlers.RoleClaims.Queries
{
    [ExcludeFromCodeCoverage]
    public class GetRoleClaimQuery : QueryByIdRequestBase<RoleClaim>
    {
        public class GetRoleClaimQueryHandler : QueryByIdRequestHandlerBase<RoleClaim>
        {
            public GetRoleClaimQueryHandler(IRoleClaimRepository roleClaimRepository) : base(roleClaimRepository)
            {
            }
        }
    }
}
