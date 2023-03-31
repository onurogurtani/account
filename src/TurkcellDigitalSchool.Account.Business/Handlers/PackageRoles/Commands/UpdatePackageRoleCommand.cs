using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Utilities.Requests;
using TurkcellDigitalSchool.Entities.Concrete; 

namespace TurkcellDigitalSchool.Account.Business.Handlers.PackageRoles.Commands
{
    [ExcludeFromCodeCoverage]
    public class UpdatePackageRoleCommand : UpdateRequestBase<PackageRole>
    {
        public class UpdatePackageRoleCommandHandler : UpdateRequestHandlerBase<PackageRole>
        {
            public UpdatePackageRoleCommandHandler(IPackageRoleRepository packageRoleRepository) : base(packageRoleRepository)
            {
            }
        }
    }
}

