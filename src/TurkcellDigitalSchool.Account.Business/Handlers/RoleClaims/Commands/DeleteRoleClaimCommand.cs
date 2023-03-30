using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Utilities.Requests;
using TurkcellDigitalSchool.Entities.Concrete.Core;
using TurkcellDigitalSchool.Identity.DataAccess.Abstract;

namespace TurkcellDigitalSchool.Account.Business.Handlers.RoleClaims.Commands
{
    [ExcludeFromCodeCoverage]
    public class DeleteRoleClaimCommand : DeleteRequestBase<RoleClaim>
    {
        public class DeleteRoleClaimCommandHandler : DeleteRequestHandlerBase<RoleClaim>
        {
            public DeleteRoleClaimCommandHandler(IRoleClaimRepository repository) : base(repository)
            {
            }
        }
    }
}

