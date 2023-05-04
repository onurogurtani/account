using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TurkcellDigitalSchool.Account.Business.Handlers.Roles.Queries;
using TurkcellDigitalSchool.Account.Business.Handlers.Roles.ValidationRules;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Common.BusinessAspects;
using TurkcellDigitalSchool.Common.Constants;
using TurkcellDigitalSchool.Common.Helpers;
using TurkcellDigitalSchool.Core.Aspects.Autofac.Validation;
using TurkcellDigitalSchool.Core.CustomAttribute;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.Results;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Roles.Commands
{
    public class RoleCopyCommand : IRequest<IResult>
    {
        public long RoleId { get; set; }
        public string RoleName { get; set; }

        [MessageClassAttr("Rol Kopyalama")]
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

            [MessageConstAttr(MessageCodeType.Error)]
            private static string SameNameAlreadyExist = Messages.SameNameAlreadyExist;
            [MessageConstAttr(MessageCodeType.Error)]
            private static string RecordDoesNotExist = Messages.RecordDoesNotExist;
            [MessageConstAttr(MessageCodeType.Success)]
            private static string RoleAdded = Constants.Messages.RoleAdded;

            [SecuredOperation] 
            public async Task<IResult> Handle(RoleCopyCommand request, CancellationToken cancellationToken)
            {
                var role = await _roleRepository.Query().AnyAsync(x => x.Name.Trim().ToLower() == request.RoleName.Trim().ToLower());
                if (role)
                    return new ErrorResult(SameNameAlreadyExist.PrepareRedisMessage());

                var sourceRoleResponse = await _mediator.Send(new GetRoleQuery
                {
                    Id = request.RoleId

                }, cancellationToken);

                if (sourceRoleResponse == null)
                    return new ErrorResult(RecordDoesNotExist.PrepareRedisMessage());

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

                return new SuccessResult(string.Format(RoleAdded.PrepareRedisMessage(), record.Name));
            }
        }
    }
}
