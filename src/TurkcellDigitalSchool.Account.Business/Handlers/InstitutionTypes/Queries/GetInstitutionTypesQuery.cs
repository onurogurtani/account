using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Utilities.Requests;
using TurkcellDigitalSchool.Entities.Concrete;

namespace TurkcellDigitalSchool.Account.Business.Handlers.InstitutionTypes.Queries
{
    [ExcludeFromCodeCoverage]
    public class GetInstitutionTypesQuery : QueryByFilterRequestBase<InstitutionType>
    {
        public class GetInstitutionTypesQueryHandler : QueryByFilterRequestHandlerBase<InstitutionType>
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