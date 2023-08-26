using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using DotNetCore.CAP;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TurkcellDigitalSchool.Account.Business.Handlers.Admins.Commands;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Account.Domain.Dtos;
using TurkcellDigitalSchool.Account.Domain.Dtos.OrganisationDtos;
using TurkcellDigitalSchool.Core.AuthorityManagement;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Common.Constants;
using TurkcellDigitalSchool.Core.Common.Helpers;
using TurkcellDigitalSchool.Core.CustomAttribute;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Extensions;
using TurkcellDigitalSchool.Core.Utilities.Results;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Organisations.Commands
{
    [LogScope]
    [SecuredOperationScope(ClaimNames = new[] { ClaimConst.OrganizationCustomerListEdit })]
    [TransactionScope]
    public class UpdateOrganisationCommand : IRequest<IResult>
    {
        public UpdateOrganisationDto Organisation { get; set; }

        [MessageClassAttr("Kurum Güncelleme")]
        public class UpdateOrganisationCommandHandler : IRequestHandler<UpdateOrganisationCommand, IResult>
        {
            private readonly IOrganisationRepository _organisationRepository;
            private readonly IOrganisationTypeRepository _organisationTypeRepository;
            private readonly IMapper _mapper;
            private readonly IPackageRoleRepository _packageRoleRepository;
            private readonly IUserRepository _userRepository;
            private readonly IMediator _mediator; 
            private readonly IPackageRepository _packageRepository;

            public UpdateOrganisationCommandHandler(IOrganisationRepository organisationRepository, IOrganisationTypeRepository organisationTypeRepository, IMapper mapper, IPackageRoleRepository packageRoleRepository, IUserRepository userRepository, IMediator mediator, IPackageRepository packageRepository)
            {
                _organisationRepository = organisationRepository;
                _organisationTypeRepository = organisationTypeRepository;
                _mapper = mapper;
                _packageRoleRepository = packageRoleRepository;
                _userRepository = userRepository;
                _mediator = mediator; 
                _packageRepository = packageRepository;
            }

            [MessageConstAttr(MessageCodeType.Error)]
            private static string SameNameAlreadyExist = Messages.SameNameAlreadyExist;
            [MessageConstAttr(MessageCodeType.Error)]
            private static string RecordDoesNotExist = Messages.RecordDoesNotExist;
            [MessageConstAttr(MessageCodeType.Error)]
            private static string PackageIsNotFound = Constants.Messages.PackageIsNotFound;
            [MessageConstAttr(MessageCodeType.Information)]
            private static string SuccessfulOperation = Messages.SuccessfulOperation;
            public async Task<IResult> Handle(UpdateOrganisationCommand request, CancellationToken cancellationToken)
            {
                var organisation = await _organisationRepository.Query().AnyAsync(x => x.Id != request.Organisation.Id && x.Name.Trim().ToLower() == request.Organisation.Name.Trim().ToLower() && x.CrmId == request.Organisation.CrmId);
                if (organisation)
                    return new ErrorResult(SameNameAlreadyExist.PrepareRedisMessage());

                var entity = await _organisationRepository.GetAsync(x => x.Id == request.Organisation.Id);
                if (entity == null)
                    return new ErrorResult(RecordDoesNotExist.PrepareRedisMessage());

                var package = await _packageRepository.Query().Where(x => x.Id == request.Organisation.PackageId).FirstOrDefaultAsync();
                if (package == null)
                    return new ErrorResult(PackageIsNotFound.PrepareRedisMessage());

                var isSingleOrPluralOrganisation = await _organisationTypeRepository.Query().AnyAsync(x => x.Id == request.Organisation.OrganisationTypeId && x.IsSingularOrganisation);

                var userType = isSingleOrPluralOrganisation ? UserType.OrganisationAdmin : UserType.FranchiseAdmin;
                //TODO paketlerin içine rol atamalarý yapýldýktan sonra aþaðýdaki istek ile kurum admini rolünü alýp admin ekleme servisine gönderilecek.
                var roleId = 1;
                //var roleId = await _packageRoleRepository.Query().Include(p => p.Role).Where(p => p.PackageId == request.Organisation.PackageId && p.Role.UserType == userType).Select(p => p.RoleId).FirstOrDefaultAsync();
                var roleIds = new List<long> { roleId };

                var organisationAdminId = await _userRepository.Query().Where(x => x.CitizenId.ToString() == request.Organisation.AdminTc).Select(x => x.Id).FirstOrDefaultAsync();

                var user = new UpdateAdminCommand
                {
                    Admin = new CreateUpdateAdminDto
                    {
                        Id = organisationAdminId,
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

                var adminResult = await _mediator.Send(user);
                if (!adminResult.Success)
                {
                    return adminResult;
                }

                _mapper.Map(request.Organisation, entity);
                entity.PackageName = package.Name;
                var record = _organisationRepository.Update(entity);
                await _organisationRepository.SaveChangesAsync(); 
                return new SuccessDataResult<Organisation>(record, SuccessfulOperation.PrepareRedisMessage());
            }
        }
    }
}

