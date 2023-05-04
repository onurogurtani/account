using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Utilities.Requests;

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