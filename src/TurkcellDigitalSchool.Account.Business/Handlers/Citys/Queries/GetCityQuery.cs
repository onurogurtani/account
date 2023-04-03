using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Utilities.Requests;
using TurkcellDigitalSchool.Entities.Concrete;
using TurkcellDigitalSchool.Shared.DataAccess.Abstract;

namespace TurkcellDigitalSchool.Shared.Business.Handlers.Citys.Queries
{
    [ExcludeFromCodeCoverage]
    public class GetCityQuery : QueryByIdRequestBase<City>
    {
        public class GetCityQueryHandler : QueryByIdRequestHandlerBase<City>
        {
            /// <summary>
            /// Get City
            /// </summary>
            public GetCityQueryHandler(ICityRepository cityRepository) : base(cityRepository)
            {
            }
        }
    }
}
