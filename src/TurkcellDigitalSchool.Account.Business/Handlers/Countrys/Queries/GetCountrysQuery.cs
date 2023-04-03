using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Utilities.Requests;
using TurkcellDigitalSchool.Entities.Concrete;
using TurkcellDigitalSchool.Shared.DataAccess.Abstract;

namespace TurkcellDigitalSchool.Shared.Business.Handlers.Countrys.Queries
{
    [ExcludeFromCodeCoverage]
    public class GetCountrysQuery : QueryByFilterRequestBase<Country>
    {
        public class GetCountrysQueryHandler : QueryByFilterRequestHandlerBase<Country>
        {
            public GetCountrysQueryHandler(ICountryRepository repository) : base(repository)
            {
            }
        }
    }
}