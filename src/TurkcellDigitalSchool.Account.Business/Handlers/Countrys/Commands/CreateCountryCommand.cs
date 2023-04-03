using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Utilities.Requests;
using TurkcellDigitalSchool.Entities.Concrete;
using TurkcellDigitalSchool.Shared.DataAccess.Abstract;

namespace TurkcellDigitalSchool.Shared.Business.Handlers.Countrys.Commands
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

