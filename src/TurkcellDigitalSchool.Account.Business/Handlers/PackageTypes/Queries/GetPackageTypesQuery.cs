using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.Common.Handlers;
using TurkcellDigitalSchool.Core.Utilities.Requests;

namespace TurkcellDigitalSchool.Account.Business.Handlers.PackageTypes.Queries
{
    [ExcludeFromCodeCoverage]
    public class GetPackageTypesQuery : QueryByFilterRequestBase<PackageType>
    {
        public class GetPackageTypesQueryHandler : QueryByFilterRequestHandlerBase<PackageType, GetPackageTypesQuery>
        {
            public GetPackageTypesQueryHandler(IPackageTypeRepository repository) : base(repository)
            {
            }
        }
    }
}