using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Utilities.Requests;

namespace TurkcellDigitalSchool.Account.Business.Handlers.OrganisationTypes.Queries
{
    [ExcludeFromCodeCoverage]
    public class GetOrganisationTypeQuery : QueryByIdRequestBase<OrganisationType>
    {
        public class GetOrganisationTypeQueryHandler : QueryByIdRequestHandlerBase<OrganisationType>
        {
            public GetOrganisationTypeQueryHandler(IOrganisationTypeRepository organisationTypeRepository) : base(organisationTypeRepository)
            {
            }
        }
    }
}
