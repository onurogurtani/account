﻿using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.AuthorityManagement;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Common.Constants;
using TurkcellDigitalSchool.Core.Common.Helpers; 
using TurkcellDigitalSchool.Core.CustomAttribute;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.Results;

namespace TurkcellDigitalSchool.Account.Business.Handlers.OrganisationTypes.Commands
{
    [LogScope]
    [SecuredOperationScope(ClaimNames = new[] { ClaimConst.OrganizationTypeEdit })]
    public class UpdateOrganisationTypeCommand : IRequest<IResult>
    {
        public OrganisationType OrganisationType { get; set; }

        [MessageClassAttr("Kurum Türü Güncelleme")]
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

            [MessageConstAttr(MessageCodeType.Error)]
            private static string SameNameAlreadyExist = Messages.SameNameAlreadyExist;
            [MessageConstAttr(MessageCodeType.Error)]
            private static string RecordDoesNotExist = Messages.RecordDoesNotExist;
            [MessageConstAttr(MessageCodeType.Error)]
            private static string CanNotChangeForRelationOrganisation = Constants.Messages.CanNotChangeForRelationOrganisation;
            [MessageConstAttr(MessageCodeType.Information)]
            private static string SuccessfulOperation = Messages.SuccessfulOperation;
            public async Task<IResult> Handle(UpdateOrganisationTypeCommand request, CancellationToken cancellationToken)
            {
                var organisationType = await _organisationTypeRepository.Query().AnyAsync(x => x.Id != request.OrganisationType.Id && x.Name.Trim().ToLower() == request.OrganisationType.Name.Trim().ToLower());
                if (organisationType)
                    return new ErrorResult(SameNameAlreadyExist.PrepareRedisMessage());

                var entity = await _organisationTypeRepository.GetAsync(x => x.Id == request.OrganisationType.Id);
                if (entity == null)
                    return new ErrorResult(RecordDoesNotExist.PrepareRedisMessage());


                if (entity.IsSingularOrganisation != request.OrganisationType.IsSingularOrganisation)
                {
                    var organisationUser = await _organisationRepository.Query().AnyAsync(x => x.OrganisationTypeId == request.OrganisationType.Id);
                    if (organisationUser)
                    {
                        return new ErrorResult(CanNotChangeForRelationOrganisation.PrepareRedisMessage());
                    }
                }

                _mapper.Map(request.OrganisationType, entity);

                var record = _organisationTypeRepository.Update(entity);
                await _organisationTypeRepository.SaveChangesAsync();

                return new SuccessDataResult<OrganisationType>(record, SuccessfulOperation.PrepareRedisMessage());
            }
        }
    }
}

