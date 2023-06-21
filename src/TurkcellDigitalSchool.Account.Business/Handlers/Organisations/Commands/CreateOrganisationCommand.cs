using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TurkcellDigitalSchool.Account.Business.Handlers.Admins.Commands;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Account.Domain.Dtos;
using TurkcellDigitalSchool.Account.Domain.Dtos.OrganisationDtos;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Common.Constants;
using TurkcellDigitalSchool.Core.Common.Helpers;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.CustomAttribute;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.Results;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Organisations.Commands
{
    [LogScope]
    [SecuredOperationScope]
    public class CreateOrganisationCommand : IRequest<IResult>
    {
        public AddOrganisationDto Organisation { get; set; }

        [MessageClassAttr("Kurum Ekleme")]
        public class CreateOrganisationCommandHandler : IRequestHandler<CreateOrganisationCommand, IResult>
        {
            private readonly IOrganisationRepository _organisationRepository;
            private readonly IOrganisationTypeRepository _organisationTypeRepository;
            private readonly IPackageRoleRepository _packageRoleRepository;
            private readonly IMediator _mediator;
            private readonly IPackageRepository _packageRepository;
            private readonly IMapper _mapper;

            public CreateOrganisationCommandHandler(IOrganisationRepository organisationRepository, IOrganisationTypeRepository organisationTypeRepository, IPackageRoleRepository packageRoleRepository, IMediator mediator, IPackageRepository packageRepository, IMapper mapper)
            {
                _organisationRepository = organisationRepository;
                _organisationTypeRepository = organisationTypeRepository;
                _packageRoleRepository = packageRoleRepository;
                _mediator = mediator;
                _packageRepository = packageRepository;
                _mapper = mapper;
            }

            [MessageConstAttr(MessageCodeType.Error)]
            private static string SameNameAlreadyExist = Messages.SameNameAlreadyExist;
            [MessageConstAttr(MessageCodeType.Error)]
            private static string PackageIsNotFound = Constants.Messages.PackageIsNotFound;
            [MessageConstAttr(MessageCodeType.Information)]
            private static string SuccessfulOperation = Messages.SuccessfulOperation;
            public async Task<IResult> Handle(CreateOrganisationCommand request, CancellationToken cancellationToken)
            {
                var organisation = await _organisationRepository.Query().AnyAsync(x => x.Name.Trim().ToLower() == request.Organisation.Name.Trim().ToLower() && x.CrmId == request.Organisation.CrmId);
                if (organisation)
                    return new ErrorResult(SameNameAlreadyExist.PrepareRedisMessage());
                var package = await _packageRepository.Query().Where(x => x.Id == request.Organisation.PackageId).FirstOrDefaultAsync();
                if (package == null)
                    return new ErrorResult(PackageIsNotFound.PrepareRedisMessage());

                var isSingleOrPluralOrganisation = await _organisationTypeRepository.Query().AnyAsync(x => x.Id == request.Organisation.OrganisationTypeId && x.IsSingularOrganisation);

                var userType = isSingleOrPluralOrganisation ? UserType.OrganisationAdmin : UserType.FranchiseAdmin;

                //TODO paketlerin içine rol atamalarý yapýldýktan sonra aþaðýdaki istek ile kurum admini rolünü alýp admin ekleme servisine gönderilecek.
                var roleId = 1;
                //var roleId = await _packageRoleRepository.Query().Include(p => p.Role).Where(p => p.PackageId == request.Organisation.PackageId && p.Role.UserType == userType).Select(p => p.RoleId).FirstOrDefaultAsync();
                var roleIds = new List<long> { roleId };

                var user = new CreateAdminCommand
                {
                    Admin = new CreateUpdateAdminDto
                    {
                        UserName = request.Organisation.AdminTc,
                        UserType = userType,
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
                var record = _mapper.Map<Organisation>(request.Organisation);
                var entity = _organisationRepository.Add(record);
                entity.PackageName = package.Name;
                await _organisationRepository.SaveChangesAsync();

                return new SuccessDataResult<Organisation>(entity, SuccessfulOperation.PrepareRedisMessage());
            }
        }
    }
}

