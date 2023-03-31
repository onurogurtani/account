using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Utilities.Requests;
using TurkcellDigitalSchool.Entities.Concrete; 

namespace TurkcellDigitalSchool.Account.Business.Handlers.PackageRoles.Commands
{
    [ExcludeFromCodeCoverage]
    public class CreatePackageRoleCommand : CreateRequestBase<PackageRole>
    {
        public class CreatePackageRoleCommandHandler : CreateRequestHandlerBase<PackageRole>
        {
            public CreatePackageRoleCommandHandler(IPackageRoleRepository packageRoleRepository) : base(packageRoleRepository)
            {
            }
        }
    }
}

