using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Utilities.Requests;

namespace TurkcellDigitalSchool.Account.Business.Handlers.InstitutionTypes.Queries
{
    [ExcludeFromCodeCoverage]
    public class GetInstitutionTypeQuery : QueryByIdRequestBase<InstitutionType>
    {
        public class GetInstitutionTypeQueryHandler : QueryByIdRequestHandlerBase<InstitutionType>
        {
            /// <summary>
            /// Get Institution Type
            /// </summary>
            public GetInstitutionTypeQueryHandler(IInstitutionTypeRepository ınstitutionTypeRepository) : base(ınstitutionTypeRepository)
            {
            }
        }
    }
}
