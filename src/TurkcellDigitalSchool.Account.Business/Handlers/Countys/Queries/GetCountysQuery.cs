using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Common.BusinessAspects;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Utilities.Requests;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Countys.Queries
{
    [ExcludeFromCodeCoverage]
    [SecuredOperation]
    [LogScope] 
    [CacheScope]
    public class GetCountysQuery : QueryByFilterRequestBase<County>
    {
        public class GetCountysQueryHandler : QueryByFilterBase<County, GetCountysQuery>
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