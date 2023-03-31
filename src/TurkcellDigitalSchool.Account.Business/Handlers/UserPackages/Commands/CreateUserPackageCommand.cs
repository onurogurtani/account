using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Utilities.Requests;
using TurkcellDigitalSchool.Entities.Concrete; 

namespace TurkcellDigitalSchool.Account.Business.Handlers.UserPackages.Commands
{
    [ExcludeFromCodeCoverage]
    public class CreateUserPackageCommand : CreateRequestBase<UserPackage>
    {
        public class CreateUserPackageCommandHandler : CreateRequestHandlerBase<UserPackage>
        {
            public CreateUserPackageCommandHandler(IUserPackageRepository userPackageRepository) : base(userPackageRepository)
            {
            }
        }
    }
}

