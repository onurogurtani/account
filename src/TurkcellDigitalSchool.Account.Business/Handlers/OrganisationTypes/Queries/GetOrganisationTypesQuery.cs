using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Utilities.Requests;
using TurkcellDigitalSchool.Entities.Concrete;

namespace TurkcellDigitalSchool.Account.Business.Handlers.OrganisationTypes.Queries
{
    [ExcludeFromCodeCoverage]
    public class GetOrganisationTypesQuery : QueryByFilterRequestBase<OrganisationType>
    {
        public class GetOrganisationTypesQueryHandler : QueryByFilterRequestHandlerBase<OrganisationType>
        {
            public GetOrganisationTypesQueryHandler(IOrganisationTypeRepository repository) : base(repository)
            {
            }
        }
    }
}