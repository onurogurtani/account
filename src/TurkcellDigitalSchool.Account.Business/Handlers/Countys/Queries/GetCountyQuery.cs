using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Utilities.Requests;
using TurkcellDigitalSchool.Entities.Concrete;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Countys.Queries
{
    [ExcludeFromCodeCoverage]
    public class GetCountyQuery : QueryByIdRequestBase<County>
    {
        public class GetCountyQueryHandler : QueryByIdRequestHandlerBase<County>
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
