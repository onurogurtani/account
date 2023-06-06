using System.Threading;
using System.Threading.Tasks;
using MediatR;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Common.BusinessAspects;
using TurkcellDigitalSchool.Common.Constants;
using TurkcellDigitalSchool.Common.Helpers;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.CustomAttribute;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.Results;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Organisations.Commands
{
    [LogScope]
    [SecuredOperation]
    public class UpdateOrganisationStatusCommand : IRequest<IResult>
    {
        public long Id { get; set; }
        public OrganisationStatusInfo OrganisationStatusInfo { get; set; }
        public string ReasonForStatus { get; set; }

        [MessageClassAttr("Kurum Durum Güncelleme")]
        public class UpdateOrganisationStatusCommandHandler : IRequestHandler<UpdateOrganisationStatusCommand, IResult>
        {
            private readonly IOrganisationRepository _organisationRepository;

            public UpdateOrganisationStatusCommandHandler(IOrganisationRepository organisationRepository)
            {
                _organisationRepository = organisationRepository;
            }

            [MessageConstAttr(MessageCodeType.Information)]
            private static string SuccessfulOperation = Messages.SuccessfulOperation;
            public async Task<IResult> Handle(UpdateOrganisationStatusCommand request, CancellationToken cancellationToken)
            {
                var organisation = await _organisationRepository.GetAsync(x => x.Id == request.Id);
                organisation.OrganisationStatusInfo = request.OrganisationStatusInfo;
                organisation.ReasonForStatus = request.ReasonForStatus;

                _organisationRepository.Update(organisation);
                await _organisationRepository.SaveChangesAsync();

                return new SuccessResult(SuccessfulOperation.PrepareRedisMessage());
            }
        }
    }
}

