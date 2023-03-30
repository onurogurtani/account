using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Utilities.Requests;
using TurkcellDigitalSchool.Entities.Concrete;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Organisations.Commands
{
    [ExcludeFromCodeCoverage]
    public class DeleteOrganisationCommand : DeleteRequestBase<Organisation>
    {
        public class DeleteOrganisationCommandHandler : DeleteRequestHandlerBase<Organisation>
        {
            public DeleteOrganisationCommandHandler(IOrganisationRepository repository) : base(repository)
            {
            }
        }
    }
}

