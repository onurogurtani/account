using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Utilities.Requests;

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

