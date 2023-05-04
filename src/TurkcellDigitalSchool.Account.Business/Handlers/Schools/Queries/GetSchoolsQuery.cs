using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Utilities.Requests;

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