using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Common.Handlers;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Utilities.Requests;

namespace TurkcellDigitalSchool.Account.Business.Handlers.RoleClaims.Commands
{
    [ExcludeFromCodeCoverage]
     
    [LogScope]

    public class UpdateRoleClaimCommand : UpdateRequestBase<RoleClaim>
    {
        public class UpdateRequestRoleClaimCommandHandler : UpdateRequestHandlerBase<RoleClaim, UpdateRoleClaimCommand>
        {
            public UpdateRequestRoleClaimCommandHandler(IRoleClaimRepository roleClaimRepository) : base(roleClaimRepository)
            {
            }
        }
    }
}

