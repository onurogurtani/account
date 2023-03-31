using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Utilities.Requests;
using TurkcellDigitalSchool.Entities.Concrete; 

namespace TurkcellDigitalSchool.Account.Business.Handlers.PackageRoles.Queries
{
    [ExcludeFromCodeCoverage]
    public class GetPackageRolesQuery : QueryByFilterRequestBase<PackageRole>
    {
        public class GetPackageRolesQueryHandler : QueryByFilterRequestHandlerBase<PackageRole>
        {
            public GetPackageRolesQueryHandler(IPackageRoleRepository repository) : base(repository)
            {
            }
        }
    }
}