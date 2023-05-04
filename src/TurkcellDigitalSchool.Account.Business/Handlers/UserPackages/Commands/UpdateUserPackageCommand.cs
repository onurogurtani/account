using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Utilities.Requests;

namespace TurkcellDigitalSchool.Account.Business.Handlers.UserPackages.Commands
{
    [ExcludeFromCodeCoverage]
    public class UpdateUserPackageCommand : UpdateRequestBase<UserPackage>
    {
        public class UpdateUserPackageCommandHandler : UpdateRequestHandlerBase<UserPackage>
        {
            public UpdateUserPackageCommandHandler(IUserPackageRepository userPackageRepository) : base(userPackageRepository)
            {
            }
        }
    }
}

