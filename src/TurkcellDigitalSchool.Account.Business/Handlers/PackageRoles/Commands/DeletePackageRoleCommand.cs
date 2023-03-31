using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Utilities.Requests;
using TurkcellDigitalSchool.Entities.Concrete; 

namespace TurkcellDigitalSchool.Account.Business.Handlers.PackageRoles.Commands
{
    [ExcludeFromCodeCoverage]
    public class DeletePackageRoleCommand : DeleteRequestBase<PackageRole>
    {
        public class DeletePackageRoleCommandHandler : DeleteRequestHandlerBase<PackageRole>
        {
            public DeletePackageRoleCommandHandler(IPackageRoleRepository repository) : base(repository)
            {
            }
        }
    }
}

