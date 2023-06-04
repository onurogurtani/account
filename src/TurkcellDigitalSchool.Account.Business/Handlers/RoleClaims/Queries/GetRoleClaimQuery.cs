using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Common.BusinessAspects;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Utilities.Requests;

namespace TurkcellDigitalSchool.Account.Business.Handlers.RoleClaims.Queries
{
    [ExcludeFromCodeCoverage]
    [SecuredOperation]
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
