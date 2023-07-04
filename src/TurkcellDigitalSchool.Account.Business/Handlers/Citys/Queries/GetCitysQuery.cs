using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Common.Handlers;
using TurkcellDigitalSchool.Core.Utilities.Requests;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Citys.Queries
{
    [ExcludeFromCodeCoverage] 
    [CacheScope] 
    [LogScope]
    public class GetCitysQuery : QueryByFilterRequestBase<City>  
    {
        public class GetCitysQueryHandler : QueryByFilterRequestHandlerBase<City, GetCitysQuery>
        {
            public GetCitysQueryHandler(ICityRepository repository) : base(repository)
            {
            }  
        }
    }
}