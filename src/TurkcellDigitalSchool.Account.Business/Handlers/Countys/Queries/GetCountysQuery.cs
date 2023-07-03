using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Common.Handlers;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Utilities.Requests;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Countys.Queries
{
    [ExcludeFromCodeCoverage] 
    [LogScope] 
    [CacheScope]
    public class GetCountysQuery : QueryByFilterRequestBase<County>
    {
        public class GetCountysQueryHandler : QueryByFilterRequestHandlerBase<County, GetCountysQuery>
        {
            /// <summary>
            /// Get Countys
            /// </summary>
            public GetCountysQueryHandler(ICountyRepository repository) : base(repository)
            {
            }
        }
    }
}