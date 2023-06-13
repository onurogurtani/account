using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Common.Handlers;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Utilities.Requests;

namespace TurkcellDigitalSchool.Account.Business.Handlers.PackageRoles.Queries
{
    [ExcludeFromCodeCoverage]
    [SecuredOperationScope]
    [LogScope]

    public class GetPackageRolesQuery : QueryByFilterRequestBase<PackageRole>
    {
        public class GetPackageRolesQueryHandler : QueryByFilterRequestHandlerBase<PackageRole, GetPackageRolesQuery>
        {
            public GetPackageRolesQueryHandler(IPackageRoleRepository repository) : base(repository)
            {
            }
        }
    }
}