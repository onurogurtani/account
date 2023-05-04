using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Utilities.Requests;

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