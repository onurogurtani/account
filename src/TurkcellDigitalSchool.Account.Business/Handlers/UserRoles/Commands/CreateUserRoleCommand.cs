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
     
    [LogScope]
    public class CreateUserRoleCommand : CreateRequestBase<UserRole>
    {
        public class CreateRequestUserRoleCommandHandler : CreateRequestHandlerBase<UserRole, CreateUserRoleCommand>
        {
            public CreateRequestUserRoleCommandHandler(IUserRoleRepository userRoleRepository) : base(userRoleRepository)
            {
            }
        }
    }
}

