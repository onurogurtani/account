using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Utilities.Requests;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Roles.Queries
{
    [ExcludeFromCodeCoverage]
    public class GetRolesQuery : QueryByFilterRequestBase<Role>
    {
        public class GetRolesQueryHandler : QueryByFilterBase<Role, GetRolesQuery>
        {
            public GetRolesQueryHandler(IRoleRepository repository) : base(repository)
            {
            }
        }
    }
}