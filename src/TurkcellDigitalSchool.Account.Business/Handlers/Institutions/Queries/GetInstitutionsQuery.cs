using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Common.BusinessAspects;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Utilities.Requests;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Institutions.Queries
{
    [ExcludeFromCodeCoverage] 
    [SecuredOperation]
    [LogScope]
    public class GetInstitutionsQuery : QueryByFilterRequestBase<Institution>
    {
        public class GetInstitutionsQueryHandler : QueryByFilterRequestHandlerBase<Institution, GetInstitutionsQuery>
        {
            /// <summary>
            /// Get Institutions
            /// </summary>
            public GetInstitutionsQueryHandler(IInstitutionRepository repository) : base(repository)
            {
            }
        }
    }
}