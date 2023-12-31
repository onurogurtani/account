using System.Diagnostics.CodeAnalysis;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Common.Handlers;
using TurkcellDigitalSchool.Core.Common.Helpers;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.CustomAttribute;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.Requests;
using TurkcellDigitalSchool.Core.Utilities.Results;

namespace TurkcellDigitalSchool.Account.Business.Handlers.OrganisationTypes.Commands
{
    [LogScope] 
    public class DeleteOrganisationTypeCommand : DeleteRequestBase<OrganisationType>
    {
        [MessageClassAttr("Kurum T�r� Silme")]
        public class DeleteRequestOrganisationTypeCommandHandler : DeleteRequestHandlerBase<OrganisationType, DeleteOrganisationTypeCommand>
        {
            IOrganisationRepository _organisationRepository;
            public DeleteRequestOrganisationTypeCommandHandler(IOrganisationTypeRepository repository, IOrganisationRepository organisationRepository) : base(repository)
            {
                _organisationRepository = organisationRepository;
            }

            [MessageConstAttr(MessageCodeType.Error)]
            private static string CanNotChangeForRelationOrganisation = Constants.Messages.CanNotChangeForRelationOrganisation;

            public override async Task<DataResult<OrganisationType>> Handle(DeleteOrganisationTypeCommand request, CancellationToken cancellationToken)
            {
                if (await _organisationRepository.Query().AnyAsync(x => x.OrganisationTypeId == request.Id))
                {
                    return new ErrorDataResult<OrganisationType>(CanNotChangeForRelationOrganisation.PrepareRedisMessage());
                }
                return  await  base.Handle(request, cancellationToken);
            }
        }
    }
}

