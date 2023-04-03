using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Utilities.Requests;
using TurkcellDigitalSchool.Entities.Concrete;
using TurkcellDigitalSchool.Shared.DataAccess.Abstract;

namespace TurkcellDigitalSchool.Shared.Business.Handlers.Countys.Queries
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
