using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Utilities.Requests;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Countrys.Commands
{
    [ExcludeFromCodeCoverage]
    public class CreateCountryCommand : CreateRequestBase<Country>
    {
        public class CreateCountryCommandHandler : CreateDefinitionRequestHandlerBase<Country>
        {
            public CreateCountryCommandHandler(ICountryRepository countryRepository) : base(countryRepository)
            {
            }
        }
    }
}

