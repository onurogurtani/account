using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Utilities.Requests;
using TurkcellDigitalSchool.Entities.Concrete.Core;
using TurkcellDigitalSchool.Identity.DataAccess.Abstract;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Roles.Queries
{
    [ExcludeFromCodeCoverage]
    public class GetRolesQuery : QueryByFilterRequestBase<Role>
    {
        public class GetRolesQueryHandler : QueryByFilterRequestHandlerBase<Role>
        {
            public GetRolesQueryHandler(IRoleRepository repository) : base(repository)
            {
            }
        }
    }
}