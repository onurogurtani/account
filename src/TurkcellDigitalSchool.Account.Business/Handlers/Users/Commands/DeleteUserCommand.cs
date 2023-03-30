using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Utilities.Requests;
using TurkcellDigitalSchool.Entities.Concrete.Core;
using TurkcellDigitalSchool.Identity.DataAccess.Abstract;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Users.Commands
{
    [ExcludeFromCodeCoverage]
    public class DeleteUserCommand : DeleteRequestBase<User>
    {
        public class DeleteUserCommandHandler : DeleteRequestHandlerBase<User>
        {
            public DeleteUserCommandHandler(IUserRepository repository) : base(repository)
            {
            }
        }
    }
}