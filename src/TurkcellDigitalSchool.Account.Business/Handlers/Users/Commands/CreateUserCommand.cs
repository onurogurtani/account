using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.Behaviors.Abstraction;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Common.Handlers; 
using TurkcellDigitalSchool.Core.Utilities.Requests;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Users.Commands
{
    [ExcludeFromCodeCoverage]
     
    [LogScope]

    public class CreateUserCommand : CreateRequestBase<User> , IUnLogable
    {
        public class CreateRequestUserCommandHandler : CreateRequestHandlerBase<User, CreateUserCommand>
        {
            public CreateRequestUserCommandHandler(IUserRepository UserRepository) : base(UserRepository)
            {
            }
        }
    }
}
