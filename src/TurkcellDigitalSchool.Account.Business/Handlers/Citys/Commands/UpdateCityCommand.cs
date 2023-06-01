using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.Business.Handlers.Citys.Queries;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Utilities.Requests;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Citys.Commands
{
    [ExcludeFromCodeCoverage]
    [RemoveCacheScope(RequestTypes = new[] { typeof(GetCitysQuery) })]
    public class UpdateCityCommand : UpdateRequestBase<City>
    {
        public class UpdateCityCommandHandler : UpdateHandlerBase<City, UpdateCityCommand> 
        {
            public UpdateCityCommandHandler(ICityRepository cityRepository) : base(cityRepository)
            {
            }
       
        }
    }
}

