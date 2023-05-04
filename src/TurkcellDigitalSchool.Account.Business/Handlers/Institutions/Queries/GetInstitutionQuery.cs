using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Utilities.Requests;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Institutions.Queries
{
    [ExcludeFromCodeCoverage]
    public class GetInstitutionQuery : QueryByIdRequestBase<Institution>
    {
        public class GetInstitutionQueryHandler : QueryByIdRequestHandlerBase<Institution>
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
