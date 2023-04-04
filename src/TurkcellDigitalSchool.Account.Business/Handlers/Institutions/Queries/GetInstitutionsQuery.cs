using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Utilities.Requests;
using TurkcellDigitalSchool.Entities.Concrete;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Institutions.Queries
{
    [ExcludeFromCodeCoverage]
    public class GetInstitutionsQuery : QueryByFilterRequestBase<Institution>
    {
        public class GetInstitutionsQueryHandler : QueryByFilterRequestHandlerBase<Institution>
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