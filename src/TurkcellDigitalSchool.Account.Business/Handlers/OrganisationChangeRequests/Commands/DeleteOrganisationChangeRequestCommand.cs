using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using TurkcellDigitalSchool.Account.Business.Handlers.OrganisationChangeRequests.ValidationRules;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Common.BusinessAspects;
using TurkcellDigitalSchool.Common.Constants;
using TurkcellDigitalSchool.Core.Aspects.Autofac.Validation;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Core.Utilities.Security.Jwt;

namespace TurkcellDigitalSchool.Account.Business.Handlers.OrganisationChangeRequests.Commands
{
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

            [SecuredOperation(Priority = 1)]
            [ValidationAspect(typeof(UpdateOrganisationChangeRequestValidator), Priority = 2)]
            public async Task<IResult> Handle(DeleteOrganisationChangeRequestCommand request, CancellationToken cancellationToken)
            {

                var entity = await _organisationInfoChangeRequestRepository.GetAsync(x => x.Id == request.Id);
                if (entity == null)
                    return new ErrorResult(Common.Constants.Messages.RecordDoesNotExist);

                if (entity.RequestState != Entities.Enums.OrganisationChangeRequestState.Forwarded)
                    return new ErrorResult(Common.Constants.Messages.ErrorInDeletingProcess);

              //Analiz netle�medi.
                //var changeContent = await _organisationChangeReqContentRepository.GetListAsync(x => x.RequestId == request.Id);
                //_organisationChangeReqContentRepository.DeleteRange(changeContent);

                // _organisationInfoChangeRequestRepository.Delete(entity);
                //await _organisationInfoChangeRequestRepository.SaveChangesAsync();

                return new SuccessResult(Messages.SuccessfulOperation);
            }
        }
    }
}

