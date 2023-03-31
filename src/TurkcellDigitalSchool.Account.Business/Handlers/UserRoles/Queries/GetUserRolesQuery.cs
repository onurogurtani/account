using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Utilities.Requests;
using TurkcellDigitalSchool.Entities.Concrete.Core; 

namespace TurkcellDigitalSchool.Account.Business.Handlers.UserRoles.Queries
{
    [ExcludeFromCodeCoverage]
    public class GetUserRolesQuery : QueryByFilterRequestBase<UserRole>
    {
        public class GetUserRolesQueryHandler : QueryByFilterRequestHandlerBase<UserRole>
        {
            public GetUserRolesQueryHandler(IUserRoleRepository repository) : base(repository)
            {
            }
        }
    }
}