using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Refit;
using TurkcellDigitalSchool.Account.Business.Handlers.Admins.Commands;
using TurkcellDigitalSchool.Account.Business.Handlers.Organisations.ValidationRules;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Common.BusinessAspects;
using TurkcellDigitalSchool.Common.Constants;
using TurkcellDigitalSchool.Core.Aspects.Autofac.Transaction;
using TurkcellDigitalSchool.Core.Aspects.Autofac.Validation;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Entities.Concrete;
using TurkcellDigitalSchool.Entities.Dtos.Admin;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Organisations.Commands
{
    public class UpdateOrganisationCommand : IRequest<IResult>
    {
        public Organisation Organisation { get; set; }

        public class UpdateOrganisationCommandHandler : IRequestHandler<UpdateOrganisationCommand, IResult>
        {
            private readonly IOrganisationRepository _organisationRepository;
            private readonly IOrganisationTypeRepository _organisationTypeRepository;
            private readonly IMapper _mapper;
            private readonly IRoleRepository _roleRepository;
            private readonly IUserRepository _userRepository;
            private readonly IMediator _mediator;

            public UpdateOrganisationCommandHandler(IOrganisationRepository organisationRepository, IOrganisationTypeRepository organisationTypeRepository, IMapper mapper, IMediator mediator, IRoleRepository roleRepository, IUserRepository userRepository)
            {
                _organisationRepository = organisationRepository;
                _organisationTypeRepository = organisationTypeRepository;
                _mediator = mediator;
                _mapper = mapper;
                _roleRepository = roleRepository;
                _userRepository = userRepository;
            }

            [SecuredOperation(Priority = 1)]
            [ValidationAspect(typeof(UpdateOrganisationValidator), Priority = 2)]
            [TransactionScopeAspectAsync]
            public async Task<IResult> Handle(UpdateOrganisationCommand request, CancellationToken cancellationToken)
            {
                var organisation = await _organisationRepository.Query().AnyAsync(x => x.Id != request.Organisation.Id && x.Name.Trim().ToLower() == request.Organisation.Name.Trim().ToLower() && x.CrmId == request.Organisation.CrmId);
                if (organisation)
                    return new ErrorResult(Messages.SameNameAlreadyExist);

                var entity = await _organisationRepository.GetAsync(x => x.Id == request.Organisation.Id);
                if (entity == null)
                    return new ErrorResult(Messages.RecordDoesNotExist);

                var userType = await _organisationTypeRepository.Query().AnyAsync(x => x.Id == request.Organisation.OrganisationTypeId && x.IsSingularOrganisation);

                //TODO paketten gelen roleId kurumAdmininin RoleIds kýsmýna eklenecek. Geçici olarak roleId deðeri 1 olarak yazýldý orasý da  kaldýrýlacak.
                var roleIds = new List<long> { 1 };

                var organisationAdminId = await _userRepository.Query().Where(x => x.CitizenId.ToString() == request.Organisation.AdminTc).Select(x => x.Id).FirstOrDefaultAsync();

                var user = new UpdateAdminCommand
                {
                    Admin = new CreateUpdateAdminDto
                    {
                        Id = organisationAdminId,
                        UserName = request.Organisation.AdminTc,
                        UserType = userType ? UserType.OrganisationAdmin : UserType.FranchiseAdmin,
                        CitizenId = request.Organisation.AdminTc,
                        Name = request.Organisation.AdminName,
                        SurName = request.Organisation.AdminSurname,
                        Email = request.Organisation.AdminMail,
                        MobilePhones = request.Organisation.AdminPhone,
                        RoleIds = roleIds,
                        Status = true
                    }
                };


                var adminResult = await _mediator.Send(user);
                if (!adminResult.Success)
                {
                    return adminResult;
                }

                _mapper.Map(request.Organisation, entity); 
                var record = _organisationRepository.Update(entity); 
                await _organisationRepository.SaveChangesAsync(); 
                return new SuccessDataResult<Organisation>(record, Messages.SuccessfulOperation);
            }
        }
    }
}

