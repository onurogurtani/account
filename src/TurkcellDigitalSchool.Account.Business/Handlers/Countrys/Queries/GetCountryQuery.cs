using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.Common.Handlers;
using TurkcellDigitalSchool.Core.Utilities.Requests;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Countrys.Queries
{
    [ExcludeFromCodeCoverage]
    public class GetCountryQuery : QueryByIdRequestBase<Country>
    {
        public class GetCountryQueryHandler : QueryByIdRequestHandlerBase<Country, GetCountryQuery>
        {
            public GetCountryQueryHandler(ICountryRepository countryRepository) : base(countryRepository)
            {
            }
        }
    }
}
