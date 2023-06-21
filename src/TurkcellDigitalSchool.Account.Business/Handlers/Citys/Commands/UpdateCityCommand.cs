using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.Business.Handlers.Citys.Queries;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.Common.Handlers;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Utilities.Requests;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Citys.Commands
{
    [ExcludeFromCodeCoverage]
    [RemoveCacheScope(RequestTypes = new[] { typeof(GetCitysQuery) })]
    public class UpdateCityCommand : UpdateRequestBase<City>
    {
        public class UpdateRequestCityCommandHandler : UpdateRequestHandlerBase<City, UpdateCityCommand> 
        {
            public UpdateRequestCityCommandHandler(ICityRepository cityRepository) : base(cityRepository)
            {
            }
       
        }
    }
}

