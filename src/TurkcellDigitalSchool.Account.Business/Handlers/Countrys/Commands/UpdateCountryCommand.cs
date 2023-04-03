using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Utilities.Requests;
using TurkcellDigitalSchool.Entities.Concrete;
using TurkcellDigitalSchool.Shared.DataAccess.Abstract;

namespace TurkcellDigitalSchool.Shared.Business.Handlers.Countrys.Commands
{
    [ExcludeFromCodeCoverage]
    public class UpdateCountryCommand : UpdateRequestBase<Country>
    {
        public class UpdateCountryCommandHandler : UpdateRequestHandlerBase<Country>
        {
            public UpdateCountryCommandHandler(ICountryRepository countryRepository) : base(countryRepository)
            {
            }
        }
    }
}

