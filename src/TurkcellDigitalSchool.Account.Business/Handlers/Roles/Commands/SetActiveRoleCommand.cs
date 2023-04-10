using System.Threading;
using System.Threading.Tasks;
using MediatR;
using TurkcellDigitalSchool.Account.Business.Constants;
using TurkcellDigitalSchool.Account.Business.Handlers.Roles.Queries;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Common.BusinessAspects;
using TurkcellDigitalSchool.Common.Helpers;
using TurkcellDigitalSchool.Core.Aspects.Autofac.Caching;
using TurkcellDigitalSchool.Core.CustomAttribute;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.Results;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Roles.Commands
{
    public class SetActiveRoleCommand : IRequest<IResult>
    {
        public int RoleId { get; set; }

        [MessageClassAttr("Rol Aktif Etme")]
        public class SetActiveRoleCommandHandler : IRequestHandler<SetActiveRoleCommand, IResult>
        {
            private readonly IRoleRepository _roleRepository;
            private readonly IMediator _mediator;

            public SetActiveRoleCommandHandler(IRoleRepository roleRepository, IMediator mediator)
            {
                _roleRepository = roleRepository;
                _mediator = mediator;
            }

            [MessageConstAttr(MessageCodeType.Error)]
            private static string RoleIsAlreadyActive = Messages.RoleIsAlreadyActive;

            [SecuredOperation(Priority = 1)]
            [CacheRemoveAspect("Get")]
            public async Task<IResult> Handle(SetActiveRoleCommand request, CancellationToken cancellationToken)
            {
                var role = await _mediator.Send(new GetRoleQuery { Id = request.RoleId }, cancellationToken);
                if (role.Data.RecordStatus == RecordStatus.Active)
                {
                    return new ErrorResult(RoleIsAlreadyActive.PrepareRedisMessage());
                }
                await _roleRepository.SetActiveRole(request.RoleId);
                return new SuccessResult();
            }
        }
    }
}
