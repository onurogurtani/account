using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Common.Handlers;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Utilities.Requests;

namespace TurkcellDigitalSchool.Account.Business.Handlers.InstitutionTypes.Queries
{
    [ExcludeFromCodeCoverage] 
    [LogScope]
    public class GetInstitutionTypeQuery : QueryByIdRequestBase<InstitutionType>
    {
        public class GetInstitutionTypeQueryHandler : QueryByIdRequestHandlerBase<InstitutionType, GetInstitutionTypeQuery>
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
