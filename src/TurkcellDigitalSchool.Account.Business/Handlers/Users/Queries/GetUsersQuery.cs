using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.Behaviors.Abstraction;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Common.Handlers; 
using TurkcellDigitalSchool.Core.Utilities.Requests;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Users.Queries
{
    [ExcludeFromCodeCoverage]
     
    [LogScope]

    public class GetUsersQuery : QueryByFilterRequestBase<User>, IUnLogable
    {
        public class GetUsersQueryHandler : QueryByFilterRequestHandlerBase<User, GetUsersQuery>
        {
            public GetUsersQueryHandler(IUserRepository repository) : base(repository)
            {
            }
        }
    }
}