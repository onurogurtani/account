using System.Diagnostics.CodeAnalysis;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Utilities.Requests;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Entities.Concrete;

namespace TurkcellDigitalSchool.Account.Business.Handlers.OrganisationTypes.Commands
{
    [ExcludeFromCodeCoverage]
    public class DeleteOrganisationTypeCommand : DeleteRequestBase<OrganisationType>
    {
        public class DeleteOrganisationTypeCommandHandler : DeleteRequestHandlerBase<OrganisationType>
        {
            IOrganisationRepository _organisationRepository;
            public DeleteOrganisationTypeCommandHandler(IOrganisationTypeRepository repository, IOrganisationRepository organisationRepository) : base(repository)
            {
                _organisationRepository = organisationRepository;
            }
            public override async Task<IDataResult<OrganisationType>> Handle(DeleteRequestBase<OrganisationType> request, CancellationToken cancellationToken)
            {
                if (await _organisationRepository.Query().AnyAsync(x=> x.OrganisationTypeId == request.Id))
                {
                    return new ErrorDataResult<OrganisationType>(Constants.Messages.CanNotChangeForRealationOrganisation);
                }
                return (IDataResult<OrganisationType>) base.Handle(request, cancellationToken);
            }
        }
    }
}

