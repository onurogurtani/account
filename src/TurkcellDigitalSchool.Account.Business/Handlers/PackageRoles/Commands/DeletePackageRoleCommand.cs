using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Utilities.Requests;
using TurkcellDigitalSchool.Entities.Concrete;
using TurkcellDigitalSchool.Identity.DataAccess.Abstract;

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

