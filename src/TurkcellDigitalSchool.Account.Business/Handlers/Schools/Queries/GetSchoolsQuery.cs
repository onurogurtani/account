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
    public class GetSchoolsQuery : QueryByFilterRequestBase<School>
    {
        public class GetSchoolsQueryHandler : QueryByFilterRequestHandlerBase<School, GetSchoolsQuery>
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