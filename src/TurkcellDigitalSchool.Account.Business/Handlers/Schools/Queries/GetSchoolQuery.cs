using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Utilities.Requests;
using TurkcellDigitalSchool.Entities.Concrete;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Schools.Queries
{
    [ExcludeFromCodeCoverage]
    public class GetSchoolQuery : QueryByIdRequestBase<School>
    {
        public class GetSchoolQueryHandler : QueryByIdRequestHandlerBase<School>
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
