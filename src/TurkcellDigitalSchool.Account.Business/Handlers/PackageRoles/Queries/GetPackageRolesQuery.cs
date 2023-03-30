using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Utilities.Requests;
using TurkcellDigitalSchool.Entities.Concrete;
using TurkcellDigitalSchool.Identity.DataAccess.Abstract;

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