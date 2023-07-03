using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Common.Handlers;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Utilities.Requests;

namespace TurkcellDigitalSchool.Account.Business.Handlers.UserRoles.Queries
{
    [ExcludeFromCodeCoverage]
     
    [LogScope]
    public class GetUserRolesQuery : QueryByFilterRequestBase<UserRole>
    {
        public class GetUserRolesQueryHandler : QueryByFilterRequestHandlerBase<UserRole, GetUserRolesQuery>
        {
            public GetUserRolesQueryHandler(IUserRoleRepository repository) : base(repository)
            {
            }
        }
    }
}