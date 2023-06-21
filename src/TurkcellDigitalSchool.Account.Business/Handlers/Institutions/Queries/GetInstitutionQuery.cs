using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Common.Handlers;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Utilities.Requests;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Institutions.Queries
{
    [ExcludeFromCodeCoverage] 
    [SecuredOperationScope]
    [LogScope]
    public class GetInstitutionQuery : QueryByIdRequestBase<Institution>
    {
        public class GetInstitutionQueryHandler : QueryByIdRequestHandlerBase<Institution, GetInstitutionQuery>
        {
            /// <summary>
            /// Get Institution
            /// </summary>
            public GetInstitutionQueryHandler(IInstitutionRepository ınstitutionRepository) : base(ınstitutionRepository)
            {
            }
        }
    }
}
