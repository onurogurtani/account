using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Utilities.Requests;

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
