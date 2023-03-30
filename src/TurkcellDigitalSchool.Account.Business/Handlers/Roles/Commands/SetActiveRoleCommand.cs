using System.Threading;
using System.Threading.Tasks;
using MediatR;
using TurkcellDigitalSchool.Account.Business.Constants;
using TurkcellDigitalSchool.Account.Business.Handlers.Roles.Queries;
using TurkcellDigitalSchool.Common.BusinessAspects;
using TurkcellDigitalSchool.Core.Aspects.Autofac.Caching;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Identity.DataAccess.Abstract;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Roles.Commands
{
    public class SetActiveRoleCommand : IRequest<IResult>
    {
        public int RoleId { get; set; }
        public class SetActiveRoleCommandHandler : IRequestHandler<SetActiveRoleCommand, IResult>
        {
            private readonly IRoleRepository _roleRepository;
            private readonly IMediator _mediator;

            public SetActiveRoleCommandHandler(IRoleRepository roleRepository, IMediator mediator)
            {
                _roleRepository = roleRepository;
                _mediator = mediator;
            }

            [SecuredOperation(Priority = 1)]
            [CacheRemoveAspect("Get")]
            public async Task<IResult> Handle(SetActiveRoleCommand request, CancellationToken cancellationToken)
            {
                var role = await _mediator.Send(new GetRoleQuery { Id = request.RoleId }, cancellationToken);
                if (role.Data.RecordStatus == RecordStatus.Active)
                {
                    return new ErrorResult(Messages.RoleIsAlreadyActive);
                }
                await _roleRepository.SetActiveRole(request.RoleId);
                return new SuccessResult();
            }
        }
    }
}
