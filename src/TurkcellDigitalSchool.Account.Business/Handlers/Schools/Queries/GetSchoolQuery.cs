using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Common.Handlers;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Utilities.Requests;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Schools.Queries
{
    [ExcludeFromCodeCoverage]
     
    [LogScope]
    public class GetSchoolQuery : QueryByIdRequestBase<School>
    {
        public class GetSchoolQueryHandler : QueryByIdRequestHandlerBase<School, GetSchoolQuery>
        {
            /// <summary>
            /// Get School
            /// </summary>
            public GetSchoolQueryHandler(ISchoolRepository schoolRepository) : base(schoolRepository)
            {
            }
        }
    }
}
