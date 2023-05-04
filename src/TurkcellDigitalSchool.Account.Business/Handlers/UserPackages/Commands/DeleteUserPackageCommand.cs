using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Utilities.Requests;

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

