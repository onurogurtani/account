using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Common.BusinessAspects;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Utilities.Requests;

namespace TurkcellDigitalSchool.Account.Business.Handlers.PackageRoles.Queries
{
    [ExcludeFromCodeCoverage]
    [SecuredOperation]
    [LogScope]

    public class GetPackageRolesQuery : QueryByFilterRequestBase<PackageRole>
    {
        public class GetPackageRolesQueryHandler : QueryByFilterBase<PackageRole, GetPackageRolesQuery>
        {
            public GetPackageRolesQueryHandler(IPackageRoleRepository repository) : base(repository)
            {
            }
        }
    }
}