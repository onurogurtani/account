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
    [SecuredOperationScope]
    [LogScope]

    public class GetRoleClaimsQuery : QueryByFilterRequestBase<RoleClaim>
    {
        public class GetRoleClaimsQueryHandler : QueryByFilterRequestHandlerBase<RoleClaim, GetRoleClaimsQuery>
        {
            public GetRoleClaimsQueryHandler(IRoleClaimRepository repository) : base(repository)
            {
            }
        }
    }
}