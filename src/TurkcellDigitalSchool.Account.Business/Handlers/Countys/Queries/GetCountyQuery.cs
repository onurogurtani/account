using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Utilities.Requests;

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
