using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Utilities.Requests;

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

