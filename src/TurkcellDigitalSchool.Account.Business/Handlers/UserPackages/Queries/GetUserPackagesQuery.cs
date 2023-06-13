using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.Common.Handlers;
using TurkcellDigitalSchool.Core.Utilities.Requests;

namespace TurkcellDigitalSchool.Account.Business.Handlers.UserPackages.Queries
{
    [ExcludeFromCodeCoverage]
    public class GetUserPackagesQuery : QueryByFilterRequestBase<UserPackage>
    {
        public class GetUserPackagesQueryHandler : QueryByFilterRequestHandlerBase<UserPackage, GetUserPackagesQuery>
        {
            public GetUserPackagesQueryHandler(IUserPackageRepository repository) : base(repository)
            {
            }
        }
    }
}