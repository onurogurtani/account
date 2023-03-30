using System.Threading;
using System.Threading.Tasks;
using MediatR;
using TurkcellDigitalSchool.Account.Business.Constants;
using TurkcellDigitalSchool.Account.Business.Handlers.Roles.Queries;
using TurkcellDigitalSchool.Common.BusinessAspects;
using TurkcellDigitalSchool.Core.Aspects.Autofac.Caching;
using TurkcellDigitalSchool.Core.Aspects.Autofac.Transaction;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Identity.DataAccess.Abstract;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Roles.Commands
{
    public class SetPassiveRoleCommand : IRequest<IResult>
    {
        public long RoleId { get; set; }
        public long? TransferRoleId { get; set; }
        public class SetPassiveRoleCommandHandler : IRequestHandler<SetPassiveRoleCommand, IResult>
        {
            private readonly IRoleRepository _roleRepository;
            private readonly IUserRoleRepository _userRoleRepository;
            private readonly IPackageRoleRepository _packageRoleRepository;
            private readonly IMediator _mediator;

            public SetPassiveRoleCommandHandler(IRoleRepository roleRepository, IUserRoleRepository userRoleRepository, IPackageRoleRepository packageRoleRepository, IMediator mediator)
            {
                _roleRepository = roleRepository;
                _userRoleRepository = userRoleRepository;
                _packageRoleRepository = packageRoleRepository;
                _mediator = mediator;
            }

            [SecuredOperation(Priority = 1)]
            [CacheRemoveAspect("Get")]
            [TransactionScopeAspectAsync]
            public async Task<IResult> Handle(SetPassiveRoleCommand request, CancellationToken cancellationToken)
            {
                var role = await _mediator.Send(new GetRoleQuery { Id = request.RoleId }, cancellationToken);
                if (role.Data.IsDefaultOrganisationRole)
                {
                    return new ErrorResult(Messages.DefaultAdminRoleCantPassive);
                }
                if ((request.TransferRoleId ?? 0) == 0)
                {

                    var passiveControl = await _mediator.Send(new PassiveCheckControlRoleQuery { RoleId = request.RoleId }, cancellationToken);
                    if (passiveControl.Data.IsPassiveCheck)
                    {
                        await _roleRepository.SetPassiveRole(request.RoleId);
                    }
                    else
                    {
                        return passiveControl;
                    }
                }
                else
                {
                    long transferRoleId = request.TransferRoleId ?? 0;
                    if (request.RoleId == request.TransferRoleId)
                    {
                        return new ErrorResult(Messages.RoleandTransferRoleCantBeTheSame);
                    }
                    var transferRole = await _mediator.Send(new GetRoleQuery { Id = transferRoleId }, cancellationToken);
                    if (transferRole.Data.RecordStatus == RecordStatus.Passive)
                    {
                        return new ErrorResult(Messages.TranferRoleIsNotActive);
                    }

                    await _packageRoleRepository.SetTransferRole(request.RoleId, transferRoleId);
                    await _userRoleRepository.SetTransferRole(request.RoleId, transferRoleId);
                    await _roleRepository.SetPassiveRole(request.RoleId);
                }
                return new SuccessResult();
            }
        }
    }
}
