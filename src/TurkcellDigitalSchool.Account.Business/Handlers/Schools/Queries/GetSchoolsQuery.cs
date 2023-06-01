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
    public class GetSchoolsQuery : QueryByFilterRequestBase<School>
    {
        public class GetSchoolsQueryHandler : QueryByFilterBase<School, GetSchoolsQuery>
        {
            /// <summary>
            /// Get Schools
            /// </summary>
            public GetSchoolsQueryHandler(ISchoolRepository repository) : base(repository)
            {
            }
        }
    }
}