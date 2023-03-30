using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Utilities.Requests;
using TurkcellDigitalSchool.Entities.Concrete.Core;
using TurkcellDigitalSchool.Identity.DataAccess.Abstract;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Users.Queries
{
    [ExcludeFromCodeCoverage]
    public class GetUserQuery : QueryByIdRequestBase<User>
    {
        public class GetUserQueryHandler : QueryByIdRequestHandlerBase<User>
        {
            public GetUserQueryHandler(IUserRepository repository) : base(repository)
            {
            }
        }
    }
}