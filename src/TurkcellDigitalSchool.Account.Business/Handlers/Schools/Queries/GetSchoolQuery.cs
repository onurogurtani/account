using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Common.BusinessAspects;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Utilities.Requests;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Schools.Queries
{
    [ExcludeFromCodeCoverage]
    [SecuredOperation]
    [LogScope]
    public class GetSchoolQuery : QueryByIdRequestBase<School>
    {
        public class GetSchoolQueryHandler : QueryByIdBase<School, GetSchoolQuery>
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
