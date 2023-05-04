using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TurkcellDigitalSchool.Account.Business.Handlers.Roles.ValidationRules;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Account.Domain.Dtos;
using TurkcellDigitalSchool.Common.BusinessAspects;
using TurkcellDigitalSchool.Common.Constants;
using TurkcellDigitalSchool.Common.Helpers;
using TurkcellDigitalSchool.Core.Aspects.Autofac.Validation;
using TurkcellDigitalSchool.Core.CustomAttribute;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.Results;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Roles.Commands
{
    public class CreateRoleCommand : IRequest<IResult>
    {
        public AddRoleDto Role { get; set; }

        [MessageClassAttr("Rol Ekleme")]
        public class CreateRoleCommandHandler : IRequestHandler<CreateRoleCommand, IResult>
        {
            private readonly IRoleRepository _roleRepository;
            private readonly IMapper _mapper;

            public CreateRoleCommandHandler(IRoleRepository roleRepository, IMapper mapper)
            {
                _roleRepository = roleRepository;
                _mapper = mapper;
            }

            [MessageConstAttr(MessageCodeType.Error)]
            private static string SameNameAlreadyExist = Messages.SameNameAlreadyExist;
            [MessageConstAttr(MessageCodeType.Success)]
            private static string RoleAdded = Constants.Messages.RoleAdded;

            [SecuredOperation] 
            public async Task<IResult> Handle(CreateRoleCommand request, CancellationToken cancellationToken)
            {
                var role = await _roleRepository.Query().AnyAsync(x => x.Name.Trim().ToLower() == request.Role.Name.Trim().ToLower());
                if (role)
                    return new ErrorResult(SameNameAlreadyExist.PrepareRedisMessage());

                var entity = _mapper.Map<Role>(request.Role);
                var record = _roleRepository.Add(entity);
                await _roleRepository.SaveChangesAsync();

                return new SuccessResult(string.Format(RoleAdded.PrepareRedisMessage(), record.Name));
            }
        }
    }
}
