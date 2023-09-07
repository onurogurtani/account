using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Common.Handlers; 
using TurkcellDigitalSchool.Core.Utilities.Requests;
using TurkcellDigitalSchool.Core.Behaviors.Abstraction;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Users.Commands
{
    [ExcludeFromCodeCoverage]
     
    [LogScope]

    public class UpdateUserCommand : UpdateRequestBase<User>, IUnLogable
    {
        public class UpdateRequestUserCommandHandler : UpdateRequestHandlerBase<User, UpdateUserCommand>
        {
            public UpdateRequestUserCommandHandler(IUserRepository userRepository) : base(userRepository)
            {
            }
        }
    }
}