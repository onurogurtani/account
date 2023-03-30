using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TurkcellDigitalSchool.Common.BusinessAspects;
using TurkcellDigitalSchool.Common.Constants;
using TurkcellDigitalSchool.Core.Aspects.Autofac.Logging;
using TurkcellDigitalSchool.Core.CrossCuttingConcerns.Logging.Serilog.Loggers;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Entities.Dtos.Admin;
using TurkcellDigitalSchool.Identity.DataAccess.Abstract;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Admins.Queries
{
    /// <summary>
    /// Get Admin User with Roles
    /// </summary>
    public class GetAdminQuery : IRequest<IDataResult<AdminDto>>
    {
        public long Id { get; set; }

        public class GetAdminQueryHandler : IRequestHandler<GetAdminQuery, IDataResult<AdminDto>>
        {
            private readonly IMapper _mapper;
            private readonly IUserRepository _userRepository;
            private readonly IUserRoleRepository _userRoleRepository;

            public GetAdminQueryHandler(IUserRoleRepository userRoleRepository, IUserRepository userRepository, IMapper mapper)
            {
                _userRepository = userRepository;
                _userRoleRepository = userRoleRepository;
                _mapper = mapper;
            }

            [LogAspect(typeof(FileLogger))]
            [SecuredOperation(Priority = 1)]
            public virtual async Task<IDataResult<AdminDto>> Handle(GetAdminQuery request, CancellationToken cancellationToken)
            {
                //var query = _userRepository.Query()
                //    .AsQueryable();
                var query = _userRepository.Query().Include(cc => cc.UserRoles).ThenInclude(rol => rol.Role)
            .Where(x => x.Id == request.Id)
            .AsQueryable();

                //  var record = await query.FirstOrDefaultAsync(x => x.Id == request.Id);

                /// var mappedRecord = _mapper.Map<User, AdminDto>(record); 

                var result = await query.OrderByDescending(x => x.UpdateTime).Select(s => new AdminDto
                {
                    AdminTypeEnum = s.AdminTypeEnum,
                    CitizenId = s.CitizenId,
                    Email = s.Email,
                    Id = s.Id,
                    MobilePhones = s.MobilePhones,
                    Name = s.Name,
                    Roles = s.UserRoles.Select(ss => new RoleDto
                    {
                        Name = ss.Role.Name,
                        Id = ss.Role.Id
                    }).ToList(),
                    Status = s.Status,
                    SurName = s.SurName,
                    UserName = s.AdminTypeEnum == AdminTypeEnum.OrganisationAdmin ? (s.CitizenId + "") : s.UserName
                }).FirstOrDefaultAsync();

                if (result == null)
                    return new ErrorDataResult<AdminDto>(null, Messages.RecordIsNotFound);
                //mappedRecord.Roles = _userRoleRepository.Query().Include(x => x.Role).AsQueryable()
                //    .Where(x => !x.IsDeleted && x.UserId == mappedRecord.Id).ToListAsync().GetAwaiter().GetResult()
                //    .Select(x => x.Role).ToList();

                //if (mappedRecord.AdminTypeEnum == AdminTypeEnum.OrganisationAdmin)
                //    mappedRecord.UserName = mappedRecord.CitizenId;

                return new SuccessDataResult<AdminDto>(result, Messages.SuccessfulOperation);

            }
        }

    }
}