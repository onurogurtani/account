using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Utilities.Requests;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Organisations.Commands
{
    [ExcludeFromCodeCoverage]
    public class DeleteOrganisationCommand : DeleteRequestBase<Organisation>
    {
        public class DeleteOrganisationCommandHandler : DeleteHandlerBase<Organisation, DeleteOrganisationCommand>
        {
            public DeleteOrganisationCommandHandler(IOrganisationRepository repository) : base(repository)
            {
            }
        }
    }
}

