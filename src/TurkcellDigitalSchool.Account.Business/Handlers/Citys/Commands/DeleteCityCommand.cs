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
    public class DeleteCityCommand : DeleteRequestBase<City>
    {
        public class DeleteRequestCityCommandHandler : DeleteRequestHandlerBase<City, DeleteCityCommand> 
        { 
            public DeleteRequestCityCommandHandler(ICityRepository repository) : base(repository)
            {
            } 
        }
    }
}

