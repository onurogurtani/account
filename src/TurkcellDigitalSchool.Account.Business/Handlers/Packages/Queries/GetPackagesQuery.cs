using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Utilities.Requests;
using TurkcellDigitalSchool.Entities.Concrete;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Packages.Queries
{
    /// <summary>
    /// Get Packages
    /// </summary>
    [ExcludeFromCodeCoverage]
    public class GetPackagesQuery : QueryByFilterRequestBase<Package>
    {
        public class GetPackagesQueryHandler : QueryByFilterRequestHandlerBase<Package>
        {
            public GetPackagesQueryHandler(IPackageRepository repository) : base(repository)
            {
            }
        }
    }
}