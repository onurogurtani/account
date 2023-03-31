using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Utilities.Requests;
using TurkcellDigitalSchool.Entities.Concrete; 

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

