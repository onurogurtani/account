using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.Common.Handlers;
using TurkcellDigitalSchool.Core.Utilities.Requests;

namespace TurkcellDigitalSchool.Account.Business.Handlers.UserPackages.Commands
{
    [ExcludeFromCodeCoverage]
    public class CreateUserPackageCommand : CreateRequestBase<UserPackage>
    {
        public class CreateRequestUserPackageCommandHandler : CreateRequestHandlerBase<UserPackage, CreateUserPackageCommand>
        {
            public CreateRequestUserPackageCommandHandler(IUserPackageRepository userPackageRepository) : base(userPackageRepository)
            {
            }
        }
    }
}

