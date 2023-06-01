using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Common.BusinessAspects;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Utilities.Requests;

namespace TurkcellDigitalSchool.Account.Business.Handlers.PackageRoles.Commands
{
    [ExcludeFromCodeCoverage]
    [SecuredOperation]
    [LogScope]

    public class DeletePackageRoleCommand : DeleteRequestBase<PackageRole>
    {
        public class DeletePackageRoleCommandHandler : DeleteHandlerBase<PackageRole, DeletePackageRoleCommand>
        {
            public DeletePackageRoleCommandHandler(IPackageRoleRepository repository) : base(repository)
            {
            }
        }
    }
}

