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

    public class GetCountyQuery : QueryByIdRequestBase<County>
    {
        public class GetCountyQueryHandler : QueryByIdBase<County, GetCountyQuery>
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
