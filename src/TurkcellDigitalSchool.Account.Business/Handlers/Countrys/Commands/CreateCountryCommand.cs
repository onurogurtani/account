using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.Common.Handlers;
using TurkcellDigitalSchool.Core.Utilities.Requests;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Countrys.Commands
{
    [ExcludeFromCodeCoverage]
    public class CreateCountryCommand : CreateRequestBase<Country>
    {
        public class CreateDefinitionRequestCountryCommandHandler : CreateDefinitionRequestHandlerBase<Country, CreateCountryCommand>
        {
            public CreateDefinitionRequestCountryCommandHandler(ICountryRepository countryRepository) : base(countryRepository)
            {
            }
        }
    }
}

