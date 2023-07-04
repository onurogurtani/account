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

    public class GetCountyQuery : QueryByIdRequestBase<County>
    {
        public class GetCountyQueryHandler : QueryByIdRequestHandlerBase<County, GetCountyQuery>
        {
            /// <summary>
            /// Get County
            /// </summary>
            public GetCountyQueryHandler(ICountyRepository countyRepository) : base(countyRepository)
            {
            }
        }
    }
}
