using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Utilities.Requests;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Educations.Queries
{
    /// <summary>
    /// Get Educations
    /// </summary>

    [ExcludeFromCodeCoverage]
    public class GetEducationsQuery : QueryByFilterRequestBase<Education>
    {
        public class GetEducationsQueryHandler : QueryByFilterRequestHandlerBase<Education>
        {
            public GetEducationsQueryHandler(IEducationRepository repository) : base(repository)
            {
            }
        }
    }
}