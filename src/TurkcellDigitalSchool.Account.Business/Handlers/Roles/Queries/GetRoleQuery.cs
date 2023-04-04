using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Common.BusinessAspects;
using TurkcellDigitalSchool.Common.Constants;
using TurkcellDigitalSchool.Core.Aspects.Autofac.Logging;
using TurkcellDigitalSchool.Core.CrossCuttingConcerns.Logging.Serilog.Loggers;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Entities.Dtos.RoleDtos; 

namespace TurkcellDigitalSchool.Account.Business.Handlers.Roles.Queries;

public class GetRoleQuery : IRequest<IDataResult<GetRoleDto>>
{
    public long Id { get; set; }

    public class GetRoleQueryHandler : IRequestHandler<GetRoleQuery, IDataResult<GetRoleDto>>
    {
        private readonly IRoleRepository _roleRepository;
        private readonly IMapper _mapper;

        public GetRoleQueryHandler(IRoleRepository roleRepository, IMapper mapper)
        {
            _roleRepository = roleRepository;
            _mapper = mapper;
        }

        [LogAspect(typeof(FileLogger))]
        [SecuredOperation(Priority = 1)]
        public virtual async Task<IDataResult<GetRoleDto>> Handle(GetRoleQuery request, CancellationToken cancellationToken)
        {
            var query = _roleRepository.Query()
                .Include(x => x.RoleClaims)
                .AsQueryable();

            var data = await query.FirstOrDefaultAsync(x => x.Id == request.Id);

            if (data == null)
                return new ErrorDataResult<GetRoleDto>(null, Messages.RecordIsNotFound);

            var role = _mapper.Map<GetRoleDto>(data);

            return new SuccessDataResult<GetRoleDto>(role, Messages.SuccessfulOperation);
        }
    }
}