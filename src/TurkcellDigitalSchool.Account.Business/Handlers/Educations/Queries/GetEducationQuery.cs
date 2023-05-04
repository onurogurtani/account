using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Utilities.Requests;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Educations.Queries
{
    /// <summary>
    /// Get Education
    /// </summary>
    [ExcludeFromCodeCoverage]
    public class GetEducationQuery : QueryByIdRequestBase<Education>
    {
        public class GetEducationQueryHandler : QueryByIdRequestHandlerBase<Education>
        {
            public GetEducationQueryHandler(IEducationRepository educationRepository) : base(educationRepository)
            {
            }
        }
    }
}
