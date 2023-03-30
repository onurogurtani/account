using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Utilities.Requests;
using TurkcellDigitalSchool.Entities.Concrete;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Schools.Queries
{
    [ExcludeFromCodeCoverage]
    public class GetSchoolsQuery : QueryByFilterRequestBase<School>
    {
        public class GetSchoolsQueryHandler : QueryByFilterRequestHandlerBase<School>
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