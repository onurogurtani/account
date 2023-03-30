using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Refit;
using TurkcellDigitalSchool.Account.Business.Handlers.Admins.Commands;
using TurkcellDigitalSchool.Account.Business.Handlers.Organisations.ValidationRules;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Common.BusinessAspects;
using TurkcellDigitalSchool.Common.Constants;
using TurkcellDigitalSchool.Core.Aspects.Autofac.Validation;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Entities.Concrete;
using TurkcellDigitalSchool.Entities.Dtos.Admin;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Organisations.Commands
{
    public class CreateOrganisationCommand : IRequest<IResult>
    {
        public Organisation Organisation { get; set; }

        public class CreateOrganisationCommandHandler : IRequestHandler<CreateOrganisationCommand, IResult>
        {
            private readonly IOrganisationRepository _organisationRepository;
            private readonly IOrganisationTypeRepository _organisationTypeRepository;
            private readonly IRoleRepository _roleRepository;
            private readonly IMediator _mediator;

            public CreateOrganisationCommandHandler(IOrganisationRepository organisationRepository, IOrganisationTypeRepository organisationTypeRepository, IMediator mediator, IRoleRepository roleRepository)
            {
                _organisationRepository = organisationRepository;
                _organisationTypeRepository = organisationTypeRepository;
                _roleRepository = roleRepository;
                _mediator = mediator;
            }

            [SecuredOperation(Priority = 1)]
            [ValidationAspect(typeof(CreateOrganisationValidator), Priority = 2)]
            public async Task<IResult> Handle(CreateOrganisationCommand request, CancellationToken cancellationToken)
            {
                var organisation = await _organisationRepository.Query().AnyAsync(x => x.Name.Trim().ToLower() == request.Organisation.Name.Trim().ToLower() && x.CrmId == request.Organisation.CrmId);
                if (organisation)
                    return new ErrorResult(Messages.SameNameAlreadyExist);

                var adminType = await _organisationTypeRepository.Query().AnyAsync(x => x.Id == request.Organisation.OrganisationTypeId && x.IsSingularOrganisation);

                var defaultOrganisationRoleId = await _roleRepository.Query().Where(x => x.IsDefaultOrganisationRole).Select(x => x.Id).FirstOrDefaultAsync();
                var roleIds = new List<long> { defaultOrganisationRoleId };

                var user = new CreateAdminCommand
                {
                    Admin = new CreateUpdateAdminDto
                    {
                        UserName = request.Organisation.AdminTc,
                        AdminTypeEnum = adminType ? AdminTypeEnum.OrganisationAdmin : AdminTypeEnum.FranchiseAdmin,
                        CitizenId = request.Organisation.AdminTc,
                        Name = request.Organisation.AdminName,
                        SurName = request.Organisation.AdminSurname,
                        Email = request.Organisation.AdminMail,
                        MobilePhones = request.Organisation.AdminPhone,
                        RoleIds = roleIds,
                        Status = true
                    }
                };


                var adminCreateResult = await _mediator.Send(user);
                if (!adminCreateResult.Success)
                {
                    return adminCreateResult;
                }
                var record = _organisationRepository.Add(request.Organisation);
                await _organisationRepository.SaveChangesAsync();

                return new SuccessDataResult<Organisation>(record, Messages.SuccessfulOperation);
            }
        }
    }
}

