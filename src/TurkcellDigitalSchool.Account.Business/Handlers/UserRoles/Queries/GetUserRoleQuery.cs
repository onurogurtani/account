using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Utilities.Requests;
using TurkcellDigitalSchool.Entities.Concrete.Core; 

namespace TurkcellDigitalSchool.Account.Business.Handlers.UserRoles.Queries
{
    [ExcludeFromCodeCoverage]
    public class GetUserRoleQuery : QueryByIdRequestBase<UserRole>
    {
        public class GetUserRoleQueryHandler : QueryByIdRequestHandlerBase<UserRole>
        {
            public GetUserRoleQueryHandler(IUserRoleRepository userRoleRepository) : base(userRoleRepository)
            {
            }
        }
    }
}
