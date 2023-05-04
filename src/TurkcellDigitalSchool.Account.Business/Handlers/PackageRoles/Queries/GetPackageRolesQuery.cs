using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Utilities.Requests;

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