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