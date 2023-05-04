using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Utilities.Requests;

namespace TurkcellDigitalSchool.Account.Business.Handlers.RoleClaims.Queries
{
    [ExcludeFromCodeCoverage]
    public class GetRoleClaimsQuery : QueryByFilterRequestBase<RoleClaim>
    {
        public class GetRoleClaimsQueryHandler : QueryByFilterRequestHandlerBase<RoleClaim>
        {
            public GetRoleClaimsQueryHandler(IRoleClaimRepository repository) : base(repository)
            {
            }
        }
    }
}