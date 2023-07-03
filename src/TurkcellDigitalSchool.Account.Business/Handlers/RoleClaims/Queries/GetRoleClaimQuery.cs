using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Common.Handlers;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Utilities.Requests;

namespace TurkcellDigitalSchool.Account.Business.Handlers.RoleClaims.Queries
{
    [ExcludeFromCodeCoverage]
     
    [LogScope]

    public class GetRoleClaimQuery : QueryByIdRequestBase<RoleClaim>
    {
        public class GetRoleClaimQueryHandler : QueryByIdRequestHandlerBase<RoleClaim, GetRoleClaimQuery>
        {
            public GetRoleClaimQueryHandler(IRoleClaimRepository roleClaimRepository) : base(roleClaimRepository)
            {
            }
        }
    }
}
