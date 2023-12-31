using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Common.Handlers;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Utilities.Requests;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Educations.Queries
{
    /// <summary>
    /// Get Educations
    /// </summary>

    [ExcludeFromCodeCoverage] 
    [LogScope]
    public class GetEducationsQuery : QueryByFilterRequestBase<Education>
    {
        public class GetEducationsQueryHandler : QueryByFilterRequestHandlerBase<Education, GetEducationsQuery>
        {
            public GetEducationsQueryHandler(IEducationRepository repository) : base(repository)
            {
            }
        }
    }
}