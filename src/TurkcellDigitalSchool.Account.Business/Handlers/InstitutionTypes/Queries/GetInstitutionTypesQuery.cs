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
    public class GetInstitutionTypesQuery : QueryByFilterRequestBase<InstitutionType>
    {
        public class GetInstitutionTypesQueryHandler : QueryByFilterRequestHandlerBase<InstitutionType, GetInstitutionTypesQuery>
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