using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Common.BusinessAspects;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Utilities.Requests;

namespace TurkcellDigitalSchool.Account.Business.Handlers.InstitutionTypes.Queries
{
    [ExcludeFromCodeCoverage]
    [SecuredOperation]
    [LogScope] 
    public class GetInstitutionTypesQuery : QueryByFilterRequestBase<InstitutionType>
    {
        public class GetInstitutionTypesQueryHandler : QueryByFilterBase<InstitutionType, GetInstitutionTypesQuery>
        {
            /// <summary>
            /// Get Institution Types
            /// </summary>
            public GetInstitutionTypesQueryHandler(IInstitutionTypeRepository repository) : base(repository)
            {
            }
        }
    }
}