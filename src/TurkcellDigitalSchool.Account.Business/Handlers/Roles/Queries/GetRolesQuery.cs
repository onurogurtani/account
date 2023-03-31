using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Utilities.Requests;
using TurkcellDigitalSchool.Entities.Concrete.Core; 

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