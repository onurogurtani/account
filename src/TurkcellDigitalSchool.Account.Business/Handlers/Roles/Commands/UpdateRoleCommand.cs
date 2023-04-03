using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TurkcellDigitalSchool.Account.Business.Constants;
using TurkcellDigitalSchool.Account.Business.Handlers.Roles.ValidationRules;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Common.BusinessAspects;
using TurkcellDigitalSchool.Core.Aspects.Autofac.Validation;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Entities.Dtos.RoleDtos; 

namespace TurkcellDigitalSchool.Account.Business.Handlers.Roles.Commands
{
    public class UpdateRoleCommand : IRequest<IResult>
    {
        public UpdateRoleDto Role { get; set; }

        public class UpdateRoleCommandHandler : IRequestHandler<UpdateRoleCommand, IResult>
        {
            private readonly IRoleRepository _roleRepository;
            private readonly IMapper _mapper;
            private readonly IUserRoleRepository _userRoleRepository;
            private readonly IPackageRoleRepository _packageRoleRepository;
            private readonly IRoleClaimRepository _roleClaimRepository;

            public UpdateRoleCommandHandler(IRoleRepository roleRepository, IMapper mapper, IUserRoleRepository userRoleRepository, IPackageRoleRepository packageRoleRepository, IRoleClaimRepository roleClaimRepository)
            {
                _roleRepository = roleRepository;
                _mapper = mapper;
                _userRoleRepository = userRoleRepository;
                _packageRoleRepository = packageRoleRepository;
                _roleClaimRepository = roleClaimRepository;
            }

            [SecuredOperation(Priority = 1)]
            [ValidationAspect(typeof(UpdateRoleValidator), Priority = 2)]
            public async Task<IResult> Handle(UpdateRoleCommand request, CancellationToken cancellationToken)
            {
                var role = await _roleRepository.Query().AnyAsync(x => x.Id != request.Role.Id && x.Name.Trim().ToLower() == request.Role.Name.Trim().ToLower());
                if (role)
                    return new ErrorResult(Common.Constants.Messages.SameNameAlreadyExist);

                var entity = await _roleRepository.GetAsync(x => x.Id == request.Role.Id);
                if (entity == null)
                    return new ErrorResult(Common.Constants.Messages.RecordDoesNotExist);

                if (entity.RoleType != request.Role.RoleType)
                {
                    var userRoles = await _userRoleRepository.Query().AnyAsync(x => x.RoleId == request.Role.Id, cancellationToken: cancellationToken);
                    var packageRoles = await _packageRoleRepository.Query().AnyAsync(x => x.RoleId == request.Role.Id, cancellationToken: cancellationToken);
                    if (userRoles || packageRoles)
                        return new ErrorResult(Messages.RoleTypeCantChanged);
                }

                var roleClaims = await _roleClaimRepository.GetListAsync(x => x.RoleId == request.Role.Id);
                _roleClaimRepository.DeleteRange(roleClaims);

                _mapper.Map(request.Role, entity);

                var record = _roleRepository.Update(entity);
                await _roleRepository.SaveChangesAsync();

                return new SuccessResult(string.Format(Messages.RoleUpdated, record.Name));
            }
        }
    }
}

