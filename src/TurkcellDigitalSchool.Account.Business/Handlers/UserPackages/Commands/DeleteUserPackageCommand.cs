using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Utilities.Requests;
using TurkcellDigitalSchool.Entities.Concrete;

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

