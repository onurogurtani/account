using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Dtos;
using TurkcellDigitalSchool.Common.BusinessAspects;
using TurkcellDigitalSchool.Common.Constants;
using TurkcellDigitalSchool.Common.Helpers;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.CustomAttribute;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.Results;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Roles.Queries;
[LogScope]
public class GetRoleQuery : IRequest<IDataResult<GetRoleDto>>
{
    public long Id { get; set; }

    [MessageClassAttr("Rol Görüntüleme")]
    public class GetRoleQueryHandler : IRequestHandler<GetRoleQuery, IDataResult<GetRoleDto>>
    {
        private readonly IRoleRepository _roleRepository;
        private readonly IMapper _mapper;

        public GetRoleQueryHandler(IRoleRepository roleRepository, IMapper mapper)
        {
            _roleRepository = roleRepository;
            _mapper = mapper;
        }

        [MessageConstAttr(MessageCodeType.Error)]
        private static string RecordIsNotFound = Messages.RecordIsNotFound;
        [MessageConstAttr(MessageCodeType.Information)]
        private static string SuccessfulOperation = Messages.SuccessfulOperation;

      
        [SecuredOperation]
        public virtual async Task<IDataResult<GetRoleDto>> Handle(GetRoleQuery request, CancellationToken cancellationToken)
        {
            var query = _roleRepository.Query()
                .Include(x => x.RoleClaims)
                .AsQueryable();

            var data = await query.FirstOrDefaultAsync(x => x.Id == request.Id);

            if (data == null)
                return new ErrorDataResult<GetRoleDto>(null, RecordIsNotFound.PrepareRedisMessage());

            var role = _mapper.Map<GetRoleDto>(data);

            return new SuccessDataResult<GetRoleDto>(role, SuccessfulOperation.PrepareRedisMessage());
        }
    }
}