using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Common.BusinessAspects;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Utilities.Requests;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Educations.Queries
{
    /// <summary>
    /// Get Education
    /// </summary>
    [ExcludeFromCodeCoverage]
    [SecuredOperation]
    [LogScope]
    public class GetEducationQuery : QueryByIdRequestBase<Education>
    {
        public class GetEducationQueryHandler : QueryByIdRequestHandlerBase<Education, GetEducationQuery>
        {
            public GetEducationQueryHandler(IEducationRepository educationRepository) : base(educationRepository)
            {
            }
        }
    }
}
