using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Utilities.Requests;
using TurkcellDigitalSchool.Entities.Concrete;

namespace TurkcellDigitalSchool.Account.Business.Handlers.PackageTypes.Queries
{
    [ExcludeFromCodeCoverage]
    public class GetPackageTypesQuery : QueryByFilterRequestBase<PackageType>
    {
        public class GetPackageTypesQueryHandler : QueryByFilterRequestHandlerBase<PackageType>
        {
            public GetPackageTypesQueryHandler(IPackageTypeRepository repository) : base(repository)
            {
            }
        }
    }
}