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
using TurkcellDigitalSchool.Entities.Concrete.Core;
using TurkcellDigitalSchool.Entities.Dtos.RoleDtos; 

namespace TurkcellDigitalSchool.Account.Business.Handlers.Roles.Commands
{
    public class CreateRoleCommand : IRequest<IResult>
    {
        public AddRoleDto Role { get; set; }

        public class CreateRoleCommandHandler : IRequestHandler<CreateRoleCommand, IResult>
        {
            private readonly IRoleRepository _roleRepository;
            private readonly IMapper _mapper;

            public CreateRoleCommandHandler(IRoleRepository roleRepository, IMapper mapper)
            {
                _roleRepository = roleRepository;
                _mapper = mapper;
            }

            [SecuredOperation(Priority = 1)]
            [ValidationAspect(typeof(CreateRoleValidator), Priority = 2)]
            public async Task<IResult> Handle(CreateRoleCommand request, CancellationToken cancellationToken)
            {
                var role = await _roleRepository.Query().AnyAsync(x => x.Name.Trim().ToLower() == request.Role.Name.Trim().ToLower());
                if (role)
                    return new ErrorResult(Common.Constants.Messages.SameNameAlreadyExist);

                var entity = _mapper.Map<Role>(request.Role);
                var record = _roleRepository.Add(entity);
                await _roleRepository.SaveChangesAsync();

                return new SuccessResult(string.Format(Messages.RoleAdded, record.Name));
            }
        }
    }
}
