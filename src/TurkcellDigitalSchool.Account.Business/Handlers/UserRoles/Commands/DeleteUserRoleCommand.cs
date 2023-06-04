using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Common.BusinessAspects;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Utilities.Requests;

namespace TurkcellDigitalSchool.Account.Business.Handlers.UserRoles.Commands
{
    [ExcludeFromCodeCoverage]
    [SecuredOperation]
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

