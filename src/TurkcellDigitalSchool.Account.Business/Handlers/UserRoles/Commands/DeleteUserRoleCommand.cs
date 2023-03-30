using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Utilities.Requests;
using TurkcellDigitalSchool.Entities.Concrete.Core;
using TurkcellDigitalSchool.Identity.DataAccess.Abstract;

namespace TurkcellDigitalSchool.Account.Business.Handlers.UserRoles.Commands
{
    [ExcludeFromCodeCoverage]
    public class DeleteUserRoleCommand : DeleteRequestBase<UserRole>
    {
        public class DeleteUserRoleCommandHandler : DeleteRequestHandlerBase<UserRole>
        {
            public DeleteUserRoleCommandHandler(IUserRoleRepository repository) : base(repository)
            {
            }
        }
    }
}

