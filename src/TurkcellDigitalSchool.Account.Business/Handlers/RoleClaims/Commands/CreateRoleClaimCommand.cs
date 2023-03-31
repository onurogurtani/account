using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Utilities.Requests;
using TurkcellDigitalSchool.Entities.Concrete.Core; 

namespace TurkcellDigitalSchool.Account.Business.Handlers.RoleClaims.Commands
{
    [ExcludeFromCodeCoverage]
    public class CreateRoleClaimCommand : CreateRequestBase<RoleClaim>
    {
        public class CreateRoleClaimCommandHandler : CreateRequestHandlerBase<RoleClaim>
        {
            public CreateRoleClaimCommandHandler(IRoleClaimRepository roleClaimRepository) : base(roleClaimRepository)
            {
            }
        }
    }
}

