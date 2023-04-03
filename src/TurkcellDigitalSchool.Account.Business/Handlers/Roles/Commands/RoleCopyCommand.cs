using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TurkcellDigitalSchool.Account.Business.Handlers.Roles.Queries;
using TurkcellDigitalSchool.Account.Business.Handlers.Roles.ValidationRules;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Common.BusinessAspects;
using TurkcellDigitalSchool.Common.Constants;
using TurkcellDigitalSchool.Core.Aspects.Autofac.Validation;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Entities.Concrete.Core; 

namespace TurkcellDigitalSchool.Account.Business.Handlers.Roles.Commands
{
    public class RoleCopyCommand : IRequest<IResult>
    {
        public long RoleId { get; set; }
        public string RoleName { get; set; }

        public class RoleCopyCommandHandler : IRequestHandler<RoleCopyCommand, IResult>
        {
            private readonly IRoleRepository _roleRepository;
            private readonly IMapper _mapper;
            private readonly IMediator _mediator;

            public RoleCopyCommandHandler(IRoleRepository roleRepository, IMapper mapper, IMediator mediator)
            {
                _roleRepository = roleRepository;
                _mapper = mapper;
                _mediator = mediator;
            }

            [SecuredOperation(Priority = 1)]
            [ValidationAspect(typeof(RoleCopyValidator), Priority = 2)]
            public async Task<IResult> Handle(RoleCopyCommand request, CancellationToken cancellationToken)
            {
                var role = await _roleRepository.Query().AnyAsync(x => x.Name.Trim().ToLower() == request.RoleName.Trim().ToLower());
                if (role)
                    return new ErrorResult(Common.Constants.Messages.SameNameAlreadyExist);

                var sourceRoleResponse = await _mediator.Send(new GetRoleQuery
                {
                    Id = request.RoleId

                }, cancellationToken);

                if (sourceRoleResponse == null)
                    return new ErrorResult(Messages.RecordDoesNotExist);

                var copyRole = _mapper.Map<Role>(sourceRoleResponse.Data);

                copyRole.Id = 0;
                copyRole.Name = request.RoleName;
                if (copyRole.RoleClaims.Count > 0)
                {
                    foreach (var item in copyRole.RoleClaims)
                    {
                        item.Id = 0;
                    }
                }

                var record = _roleRepository.Add(copyRole);
                await _roleRepository.SaveChangesAsync();

                return new SuccessResult(string.Format(Account.Business.Constants.Messages.RoleAdded, record.Name));
            }
        }
    }
}
