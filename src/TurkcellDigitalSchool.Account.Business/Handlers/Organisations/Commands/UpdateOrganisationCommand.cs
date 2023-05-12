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
using TurkcellDigitalSchool.Common.BusinessAspects;
using TurkcellDigitalSchool.Common.Constants;
using TurkcellDigitalSchool.Common.Helpers;
using TurkcellDigitalSchool.Core.Aspects.Autofac.Transaction;
using TurkcellDigitalSchool.Core.CustomAttribute;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.Results;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Organisations.Commands
{
    public class UpdateOrganisationCommand : IRequest<IResult>
    {
        public Organisation Organisation { get; set; }

        [MessageClassAttr("Kurum Güncelleme")]
        public class UpdateOrganisationCommandHandler : IRequestHandler<UpdateOrganisationCommand, IResult>
        {
            private readonly IOrganisationRepository _organisationRepository;
            private readonly IOrganisationTypeRepository _organisationTypeRepository;
            private readonly IMapper _mapper;
            private readonly IPackageRoleRepository _packageRoleRepository;
            private readonly IUserRepository _userRepository;
            private readonly IMediator _mediator;


            [MessageConstAttr(MessageCodeType.Error)]
            private static string SameNameAlreadyExist = Messages.SameNameAlreadyExist;
            [MessageConstAttr(MessageCodeType.Error)]
            private static string RecordDoesNotExist = Messages.RecordDoesNotExist;
            [MessageConstAttr(MessageCodeType.Information)]
            private static string SuccessfulOperation = Messages.SuccessfulOperation;

            public UpdateOrganisationCommandHandler(IOrganisationRepository organisationRepository, IOrganisationTypeRepository organisationTypeRepository, IMapper mapper, IPackageRoleRepository packageRoleRepository, IUserRepository userRepository, IMediator mediator)
            {
                _organisationRepository = organisationRepository;
                _organisationTypeRepository = organisationTypeRepository;
                _mapper = mapper;
                _packageRoleRepository = packageRoleRepository;
                _userRepository = userRepository;
                _mediator = mediator;
            }

            [SecuredOperation]  
            [TransactionScopeAspectAsync]
            public async Task<IResult> Handle(UpdateOrganisationCommand request, CancellationToken cancellationToken)
            {
                var organisation = await _organisationRepository.Query().AnyAsync(x => x.Id != request.Organisation.Id && x.Name.Trim().ToLower() == request.Organisation.Name.Trim().ToLower() && x.CrmId == request.Organisation.CrmId);
                if (organisation)
                    return new ErrorResult(SameNameAlreadyExist.PrepareRedisMessage());

                var entity = await _organisationRepository.GetAsync(x => x.Id == request.Organisation.Id);
                if (entity == null)
                    return new ErrorResult(RecordDoesNotExist.PrepareRedisMessage());

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
                var record = _organisationRepository.Update(entity);
                await _organisationRepository.SaveChangesAsync();
                return new SuccessDataResult<Organisation>(record, SuccessfulOperation.PrepareRedisMessage());
            }
        }
    }
}

