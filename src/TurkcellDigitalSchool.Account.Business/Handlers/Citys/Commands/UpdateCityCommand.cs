using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Utilities.Requests;
using TurkcellDigitalSchool.Entities.Concrete;
using TurkcellDigitalSchool.Shared.DataAccess.Abstract;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Citys.Commands
{
    [ExcludeFromCodeCoverage]
    public class UpdateCityCommand : UpdateRequestBase<City>
    {
        public class UpdateCityCommandHandler : UpdateRequestHandlerBase<City>
        {
            /// <summary>
            /// Update City
            /// </summary>
            public UpdateCityCommandHandler(ICityRepository cityRepository) : base(cityRepository)
            {
            }
        }
    }
}

