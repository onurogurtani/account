using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Common.BusinessAspects;
using TurkcellDigitalSchool.Common.Constants;
using TurkcellDigitalSchool.Common.Helpers;
using TurkcellDigitalSchool.Core.CustomAttribute;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.Results;

namespace TurkcellDigitalSchool.Account.Business.Handlers.AdminUsers.Commands
{
    public class CreateAdminRoleCommand : IRequest<long>
    {


        [MessageClassAttr("Rol Ekleme")]
        public class CreateAdminRoleCommandHandler : IRequestHandler<CreateAdminRoleCommand, long>
        {
            private readonly IRoleRepository _roleRepository;
            private readonly IOperationClaimRepository _operationClaimRepository;
            private readonly IRoleClaimRepository _roleClaimRepository;
            private readonly IMapper _mapper;

            public CreateAdminRoleCommandHandler(IRoleRepository roleRepository, IMapper mapper,
                IOperationClaimRepository operationClaimRepository, IRoleClaimRepository roleClaimRepository)
            {
                _roleRepository = roleRepository;
                _mapper = mapper;
                _operationClaimRepository = operationClaimRepository;
                _roleClaimRepository = roleClaimRepository;
            }

            [MessageConstAttr(MessageCodeType.Error)]
            private static string SameNameAlreadyExist = Messages.SameNameAlreadyExist;
            [MessageConstAttr(MessageCodeType.Information)]
            private static string RoleAdded = Constants.Messages.RoleAdded;

            [SecuredOperation]
            public async Task<long> Handle(CreateAdminRoleCommand request, CancellationToken cancellationToken)
            {

                var roleName = "SuperAdmin";
                var role = await _roleRepository.Query().FirstOrDefaultAsync(x => x.Name == roleName) ?? new Role
                {
                    Name = roleName,
                    UserType= UserType.Admin,
                };
                if (role.Id == 0)
                {
                    _roleRepository.Add(role);
                    await _roleRepository.SaveChangesAsync();
                }

                var claims = _operationClaimRepository.GetListAsync().Result.Select(x => x.Name).ToList();

                foreach (var item in claims)
                {
                    var existClaims = _roleClaimRepository.Query().Any(x => x.ClaimName.Contains(item));
                    if (!existClaims)
                    {
                        _roleClaimRepository.Add(new RoleClaim()
                        {
                            ClaimName = item,
                            RoleId = role.Id
                        });
                    }
                }
                await _roleClaimRepository.SaveChangesAsync();

                return role.Id;
            }
        }
    }
}
