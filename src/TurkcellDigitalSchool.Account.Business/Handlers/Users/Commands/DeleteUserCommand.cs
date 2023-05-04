using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Utilities.Requests;

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