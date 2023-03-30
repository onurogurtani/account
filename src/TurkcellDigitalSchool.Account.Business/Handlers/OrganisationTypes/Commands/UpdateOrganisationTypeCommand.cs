using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TurkcellDigitalSchool.Account.Business.Handlers.OrganisationTypes.ValidationRules;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Common.BusinessAspects;
using TurkcellDigitalSchool.Common.Constants;
using TurkcellDigitalSchool.Core.Aspects.Autofac.Validation;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Entities.Concrete;

namespace TurkcellDigitalSchool.Account.Business.Handlers.OrganisationTypes.Commands
{
    public class UpdateOrganisationTypeCommand : IRequest<IResult>
    {
        public OrganisationType OrganisationType { get; set; }

        public class UpdateOrganisationTypeCommandHandler : IRequestHandler<UpdateOrganisationTypeCommand, IResult>
        {
            private readonly IOrganisationTypeRepository _organisationTypeRepository;
            private readonly IOrganisationRepository _organisationRepository;
            private readonly IMapper _mapper;

            public UpdateOrganisationTypeCommandHandler(IOrganisationTypeRepository organisationTypeRepository, IMapper mapper, IOrganisationRepository organisationRepository)
            {
                _organisationTypeRepository = organisationTypeRepository;
                _organisationRepository = organisationRepository;
                _mapper = mapper;
            }

            [SecuredOperation(Priority = 1)]
            [ValidationAspect(typeof(UpdateOrganisationTypeValidator), Priority = 2)]
            public async Task<IResult> Handle(UpdateOrganisationTypeCommand request, CancellationToken cancellationToken)
            {
                var organisationType = await _organisationTypeRepository.Query().AnyAsync(x => x.Id != request.OrganisationType.Id && x.Name.Trim().ToLower() == request.OrganisationType.Name.Trim().ToLower());
                if (organisationType)
                    return new ErrorResult(Messages.SameNameAlreadyExist);

                var entity = await _organisationTypeRepository.GetAsync(x => x.Id == request.OrganisationType.Id);
                if (entity == null)
                    return new ErrorResult(Messages.RecordDoesNotExist);


                if (entity.IsSingularOrganisation != request.OrganisationType.IsSingularOrganisation)
                {
                    var organisationUser = await _organisationRepository.Query().AnyAsync(x => x.OrganisationTypeId == request.OrganisationType.Id);
                    if (organisationUser)
                    {
                        return new ErrorResult(Constants.Messages.CanNotChangeForRealationOrganisation);
                    }
                }

                _mapper.Map(request.OrganisationType, entity);

                var record = _organisationTypeRepository.Update(entity);
                await _organisationTypeRepository.SaveChangesAsync();

                return new SuccessDataResult<OrganisationType>(record, Messages.SuccessfulOperation);
            }
        }
    }
}

