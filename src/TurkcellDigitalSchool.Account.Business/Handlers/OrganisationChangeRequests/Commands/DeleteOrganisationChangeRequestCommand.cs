using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Common.BusinessAspects;
using TurkcellDigitalSchool.Common.Constants;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Core.Utilities.Security.Jwt;

namespace TurkcellDigitalSchool.Account.Business.Handlers.OrganisationChangeRequests.Commands
{
    [LogScope]
    [SecuredOperation]
    public class DeleteOrganisationChangeRequestCommand : IRequest<IResult>
    {
        public long Id { get; set; }

        public class DeleteOrganisationChangeRequestCommandHandler : IRequestHandler<DeleteOrganisationChangeRequestCommand, IResult>
        {
            private readonly IOrganisationInfoChangeRequestRepository _organisationInfoChangeRequestRepository;
            private readonly IOrganisationChangeReqContentRepository _organisationChangeReqContentRepository;
            private readonly ITokenHelper _tokenHelper;
            public readonly IMapper _mapper;

            public DeleteOrganisationChangeRequestCommandHandler(IOrganisationInfoChangeRequestRepository organisationInfoChangeRequestRepository, IOrganisationChangeReqContentRepository organisationChangeReqContentRepository,ITokenHelper tokenHelper, IMapper mapper)
            {
                _organisationInfoChangeRequestRepository = organisationInfoChangeRequestRepository;
                _organisationChangeReqContentRepository = organisationChangeReqContentRepository;
                _tokenHelper = tokenHelper;
                _mapper = mapper;
            }

            public async Task<IResult> Handle(DeleteOrganisationChangeRequestCommand request, CancellationToken cancellationToken)
            {

                var entity = await _organisationInfoChangeRequestRepository.GetAsync(x => x.Id == request.Id);
                if (entity == null)
                    return new ErrorResult(Messages.RecordDoesNotExist);

                if (entity.RequestState != OrganisationChangeRequestState.Forwarded)
                    return new ErrorResult(Common.Constants.Messages.ErrorInDeletingProcess);

              //Analiz netleþmedi.
                //var changeContent = await _organisationChangeReqContentRepository.GetListAsync(x => x.RequestId == request.Id);
                //_organisationChangeReqContentRepository.DeleteRange(changeContent);

                // _organisationInfoChangeRequestRepository.Delete(entity);
                //await _organisationInfoChangeRequestRepository.SaveChangesAsync();

                return new SuccessResult(Messages.SuccessfulOperation);
            }
        }
    }
}

