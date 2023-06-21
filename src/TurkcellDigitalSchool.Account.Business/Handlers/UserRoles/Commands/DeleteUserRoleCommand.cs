using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Common.Handlers;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Utilities.Requests;

namespace TurkcellDigitalSchool.Account.Business.Handlers.UserRoles.Commands
{
    [ExcludeFromCodeCoverage]
    [SecuredOperationScope]
    [LogScope]
    public class DeleteUserRoleCommand : DeleteRequestBase<UserRole>
    {
        public class DeleteRequestUserRoleCommandHandler : DeleteRequestHandlerBase<UserRole, DeleteUserRoleCommand>
        {
            public DeleteRequestUserRoleCommandHandler(IUserRoleRepository repository) : base(repository)
            {
            }
        }
    }
}

