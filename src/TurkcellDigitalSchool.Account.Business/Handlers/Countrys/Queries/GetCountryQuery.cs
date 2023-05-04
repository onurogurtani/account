using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Utilities.Requests;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Countrys.Queries
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
