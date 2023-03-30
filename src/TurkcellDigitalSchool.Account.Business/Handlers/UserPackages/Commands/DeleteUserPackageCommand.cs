using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Utilities.Requests;
using TurkcellDigitalSchool.Entities.Concrete;
using TurkcellDigitalSchool.Identity.DataAccess.Abstract;

namespace TurkcellDigitalSchool.Account.Business.Handlers.UserPackages.Commands
{
    [ExcludeFromCodeCoverage]
    public class DeleteUserPackageCommand : DeleteRequestBase<UserPackage>
    {
        public class DeleteUserPackageCommandHandler : DeleteRequestHandlerBase<UserPackage>
        {
            public DeleteUserPackageCommandHandler(IUserPackageRepository repository) : base(repository)
            {
            }
        }
    }
}

