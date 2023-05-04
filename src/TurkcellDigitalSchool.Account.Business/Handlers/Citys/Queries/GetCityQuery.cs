using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Utilities.Requests;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Citys.Queries
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
