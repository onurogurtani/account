using System.Diagnostics.CodeAnalysis;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Common.Helpers;
using TurkcellDigitalSchool.Core.CustomAttribute;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.Requests;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Entities.Concrete;

namespace TurkcellDigitalSchool.Account.Business.Handlers.OrganisationTypes.Commands
{
    [ExcludeFromCodeCoverage]
    public class DeleteOrganisationTypeCommand : DeleteRequestBase<OrganisationType>
    {
        [MessageClassAttr("Kurum T�r� Silme")]
        public class DeleteOrganisationTypeCommandHandler : DeleteRequestHandlerBase<OrganisationType>
        {
            IOrganisationRepository _organisationRepository;
            public DeleteOrganisationTypeCommandHandler(IOrganisationTypeRepository repository, IOrganisationRepository organisationRepository) : base(repository)
            {
                _organisationRepository = organisationRepository;
            }

            [MessageConstAttr(MessageCodeType.Error)]
            private static string CanNotChangeForRelationOrganisation = Constants.Messages.CanNotChangeForRelationOrganisation;

            public override async Task<IDataResult<OrganisationType>> Handle(DeleteRequestBase<OrganisationType> request, CancellationToken cancellationToken)
            {
                if (await _organisationRepository.Query().AnyAsync(x => x.OrganisationTypeId == request.Id))
                {
                    return new ErrorDataResult<OrganisationType>(CanNotChangeForRelationOrganisation.PrepareRedisMessage());
                }
                return (IDataResult<OrganisationType>)base.Handle(request, cancellationToken);
            }
        }
    }
}

