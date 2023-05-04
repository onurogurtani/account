using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Utilities.Requests;

namespace TurkcellDigitalSchool.Account.Business.Handlers.UserPackages.Queries
{
    [ExcludeFromCodeCoverage]
    public class GetUserPackageQuery : QueryByIdRequestBase<UserPackage>
    {
        public class GetUserPackageQueryHandler : QueryByIdRequestHandlerBase<UserPackage>
        {
            public GetUserPackageQueryHandler(IUserPackageRepository userPackageRepository) : base(userPackageRepository)
            {
            }
        }
    }
}
