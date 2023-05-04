using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Utilities.Requests;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Citys.Commands
{
    [ExcludeFromCodeCoverage]
    public class CreateCityCommand : CreateRequestBase<City>
    {
        public class CreateCityCommandHandler : CreateRequestHandlerBase<City>
        {
            /// <summary>
            /// Create City
            /// </summary>
            public CreateCityCommandHandler(ICityRepository cityRepository) : base(cityRepository)
            {
            }
        }
    }
}

