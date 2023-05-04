using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Utilities.Requests;

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
