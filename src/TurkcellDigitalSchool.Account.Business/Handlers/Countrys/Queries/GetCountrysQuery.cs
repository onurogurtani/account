using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Utilities.Requests;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Countrys.Queries
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