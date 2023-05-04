using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Utilities.Requests;

namespace TurkcellDigitalSchool.Account.Business.Handlers.UserRoles.Commands
{
    [ExcludeFromCodeCoverage]
    public class CreateUserRoleCommand : CreateRequestBase<UserRole>
    {
        public class CreateUserRoleCommandHandler : CreateRequestHandlerBase<UserRole>
        {
            public CreateUserRoleCommandHandler(IUserRoleRepository userRoleRepository) : base(userRoleRepository)
            {
            }
        }
    }
}

