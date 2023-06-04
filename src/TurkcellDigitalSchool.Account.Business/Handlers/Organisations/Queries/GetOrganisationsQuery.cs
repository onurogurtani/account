using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Utilities.Requests;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Organisations.Queries
{
    [ExcludeFromCodeCoverage]
    public class GetOrganisationsQuery : QueryByFilterRequestBase<Organisation>
    {
        public class GetOrganisationsQueryHandler : QueryByFilterRequestHandlerBase<Organisation, GetOrganisationsQuery>
        {
            public GetOrganisationsQueryHandler(IOrganisationRepository repository) : base(repository)
            {
            }
        }
    }
}