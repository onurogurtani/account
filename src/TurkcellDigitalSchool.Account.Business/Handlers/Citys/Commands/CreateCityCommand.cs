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
    [LogScope]
    [RemoveCacheScope(RequestTypes = new[] { typeof(GetCitysQuery) })]
    public class CreateCityCommand : CreateRequestBase<City>
    {
        public class CreateRequestCityCommandHandler : CreateRequestHandlerBase<City, CreateCityCommand>
        {
            public CreateRequestCityCommandHandler(ICityRepository cityRepository) : base(cityRepository)
            {
            } 
        }
    }
}

