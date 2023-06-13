using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.Common.Handlers;
using TurkcellDigitalSchool.Core.Utilities.Requests;

namespace TurkcellDigitalSchool.Account.Business.Handlers.OrganisationTypes.Queries
{
    [ExcludeFromCodeCoverage]
    public class GetOrganisationTypesQuery : QueryByFilterRequestBase<OrganisationType>
    {
        public class GetOrganisationTypesQueryHandler : QueryByFilterRequestHandlerBase<OrganisationType, GetOrganisationTypesQuery>
        {
            public GetOrganisationTypesQueryHandler(IOrganisationTypeRepository repository) : base(repository)
            {
            }
        }
    }
}