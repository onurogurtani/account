using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Utilities.Requests;
using TurkcellDigitalSchool.Entities.Concrete;
using TurkcellDigitalSchool.Shared.DataAccess.Abstract;

namespace TurkcellDigitalSchool.Shared.Business.Handlers.Countrys.Queries
{
    [ExcludeFromCodeCoverage]
    public class GetCountryQuery : QueryByIdRequestBase<Country>
    {
        public class GetCountryQueryHandler : QueryByIdRequestHandlerBase<Country>
        {
            public GetCountryQueryHandler(ICountryRepository countryRepository) : base(countryRepository)
            {
            }
        }
    }
}
