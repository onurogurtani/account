using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Utilities.Requests;
using TurkcellDigitalSchool.Entities.Concrete.Core;
using TurkcellDigitalSchool.Identity.DataAccess.Abstract;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Users.Commands
{
    [ExcludeFromCodeCoverage]
    public class CreateUserCommand : CreateRequestBase<User>
    {
        public class CreateUserCommandHandler : CreateRequestHandlerBase<User>
        {
            public CreateUserCommandHandler(IUserRepository UserRepository) : base(UserRepository)
            {
            }
        }
    }
}
