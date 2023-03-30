using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Utilities.Requests;
using TurkcellDigitalSchool.Entities.Concrete;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Organisations.Queries
{
    [ExcludeFromCodeCoverage]
    public class GetOrganisationsQuery : QueryByFilterRequestBase<Organisation>
    {
        public class GetOrganisationsQueryHandler : QueryByFilterRequestHandlerBase<Organisation>
        {
            public GetOrganisationsQueryHandler(IOrganisationRepository repository) : base(repository)
            {
            }
        }
    }
}