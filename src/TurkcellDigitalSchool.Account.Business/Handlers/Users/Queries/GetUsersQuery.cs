using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Common.BusinessAspects;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Utilities.Requests;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Users.Queries
{
    [ExcludeFromCodeCoverage]
    [SecuredOperation]
    [LogScope]

    public class GetUsersQuery : QueryByFilterRequestBase<User>
    {
        public class GetUsersQueryHandler : QueryByFilterRequestHandlerBase<User, GetUsersQuery>
        {
            public GetUsersQueryHandler(IUserRepository repository) : base(repository)
            {
            }
        }
    }
}