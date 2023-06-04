using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Utilities.Requests;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Countrys.Commands
{
    [ExcludeFromCodeCoverage]
    public class UpdateCountryCommand : UpdateRequestBase<Country>
    {
        public class UpdateCountryCommandHandler : UpdateHandlerBase<Country, UpdateCountryCommand>
        {
            public UpdateCountryCommandHandler(ICountryRepository countryRepository) : base(countryRepository)
            {
            }
        }
    }
}

