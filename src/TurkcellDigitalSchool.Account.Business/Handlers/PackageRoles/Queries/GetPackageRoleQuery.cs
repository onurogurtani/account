using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Utilities.Requests;

namespace TurkcellDigitalSchool.Account.Business.Handlers.PackageRoles.Queries
{
    [ExcludeFromCodeCoverage]
    public class GetPackageRoleQuery : QueryByIdRequestBase<PackageRole>
    {
        public class GetPackageRoleQueryHandler : QueryByIdRequestHandlerBase<PackageRole>
        {
            public GetPackageRoleQueryHandler(IPackageRoleRepository packageRoleRepository) : base(packageRoleRepository)
            {
            }
        }
    }
}
