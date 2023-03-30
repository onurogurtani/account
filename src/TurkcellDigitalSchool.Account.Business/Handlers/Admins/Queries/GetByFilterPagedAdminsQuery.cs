using System;
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
using TurkcellDigitalSchool.Core.Utilities.Paging;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Core.Utilities.Security.Jwt;
using TurkcellDigitalSchool.Entities.Dtos.Admin;
using TurkcellDigitalSchool.Identity.DataAccess.Abstract;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Admins.Queries
{
    ///<summary>
    ///Get Filtered Paged Admins  with Roles
    /// </summary>
    public class GetByFilterPagedAdminsQuery : IRequest<IDataResult<PagedList<AdminDto>>>
    {
        public AdminDetailSearch AdminDetailSearch { get; set; } = new AdminDetailSearch();

        public class GetByFilterPagedAdminsQueryHandler : IRequestHandler<GetByFilterPagedAdminsQuery, IDataResult<PagedList<AdminDto>>>
        {
            private readonly IMapper _mapper;
            private readonly IUserRepository _userRepository;
            private readonly IUserRoleRepository _userRoleRepository;
            private readonly IUserSessionRepository _userSessionRepository;
            private readonly ITokenHelper _tokenHelper;

            public GetByFilterPagedAdminsQueryHandler(IUserRoleRepository userRoleRepository, IUserRepository userRepository, IMapper mapper, IUserSessionRepository userSessionRepository, ITokenHelper tokenHelper)
            {
                _userRepository = userRepository;
                _userRoleRepository = userRoleRepository;
                _userSessionRepository = userSessionRepository;
                _mapper = mapper;
                _tokenHelper = tokenHelper;
            }

            [LogAspect(typeof(FileLogger))]
            [SecuredOperation(Priority = 1)]
            public virtual async Task<IDataResult<PagedList<AdminDto>>> Handle(GetByFilterPagedAdminsQuery request, CancellationToken cancellationToken)
            {
                long currentUserId = _tokenHelper.GetUserIdByCurrentToken();
                var currentUser = await _userRepository.GetAsync(p => p.Id == currentUserId);

                if (currentUser.AdminTypeEnum == null)
                    return new ErrorDataResult<PagedList<AdminDto>>(Messages.AutorizationRoleError);

                if (currentUser.AdminTypeEnum == AdminTypeEnum.OrganisationAdmin)
                    request.AdminDetailSearch.AdminTypeEnum = AdminTypeEnum.OrganisationAdmin;

                var query = _userRepository.Query().Include(cc => cc.UserRoles).ThenInclude(rol => rol.Role)
                    .Where(x => x.AdminTypeEnum != null && x.AdminTypeEnum > 0)
                    .AsQueryable();

                if (!string.IsNullOrWhiteSpace(request.AdminDetailSearch.Name))
                    query = query.Where(x => x.Name.ToLower().Contains(request.AdminDetailSearch.Name.ToLower()));

                if (!string.IsNullOrWhiteSpace(request.AdminDetailSearch.CitizenId))
                    query = query.Where(x => x.CitizenId == Convert.ToInt64(request.AdminDetailSearch.CitizenId));

                if (!string.IsNullOrWhiteSpace(request.AdminDetailSearch.SurName))
                    query = query.Where(x => x.SurName.ToLower().Contains(request.AdminDetailSearch.SurName.ToLower()));

                if (!string.IsNullOrWhiteSpace(request.AdminDetailSearch.UserName))
                    query = query.Where(x => x.UserName.ToLower().Contains(request.AdminDetailSearch.UserName.ToLower()));

                if (!string.IsNullOrWhiteSpace(request.AdminDetailSearch.Email))
                    query = query.Where(x => x.Email.ToLower().Contains(request.AdminDetailSearch.Email.ToLower()));

                if (!string.IsNullOrWhiteSpace(request.AdminDetailSearch.MobilePhones))
                    query = query.Where(x => x.MobilePhones.Contains(request.AdminDetailSearch.MobilePhones));

                if (request.AdminDetailSearch.AdminTypeEnum != null)
                    query = query.Where(x => x.AdminTypeEnum == request.AdminDetailSearch.AdminTypeEnum);


                var items = await query.OrderByDescending(x => x.UpdateTime ?? DateTime.MinValue).Select(s => new AdminDto
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
                    UserName = s.AdminTypeEnum == AdminTypeEnum.OrganisationAdmin ? (s.CitizenId + "") : s.UserName,
                    LastLoginDate = (s.LastMobileSessionTime ?? DateTime.MinValue) > (s.LastWebSessionTime??DateTime.MinValue) ? s.LastMobileSessionTime : s.LastWebSessionTime
                }).ToListAsync();

                //    var mappedUserItems = _mapper.Map<List<User>, List<AdminDto>>(items);



                //foreach (var user in items)
                //{
                //    //user.Roles = _userRoleRepository.Query().Include(x => x.Role).AsQueryable()
                //    //    .Where(x => !x.IsDeleted && x.UserId == user.Id).ToListAsync().GetAwaiter().GetResult()
                //    //    .Select(x => x.Role).ToList();


                //    var lastLoginDate = await _userSessionRepository.Query().Where(w => w.UserId == user.Id).OrderByDescending(w => w.StartTime).Select(s => s.StartTime)
                //        .FirstOrDefaultAsync(cancellationToken);

                //    //   var lastLoginDate = userSessions.Any() ? userSessions.Max() : (DateTime?)null;

                //    user.LastLoginDate = lastLoginDate == DateTime.MinValue ? null : lastLoginDate;

                //    //if (user.AdminTypeEnum == AdminTypeEnum.OrganisationAdmin)
                //    //    user.UserName= user.CitizenId;
                //}


                //if (request.AdminDetailSearch.RoleIds.Length > 0)
                //    mappedUserItems = mappedUserItems.Where(x => x.Roles.Any(s => request.AdminDetailSearch.RoleIds.Contains(s.Id))).ToList();

                var queryCount = items.Count;

                items = items.Skip((request.AdminDetailSearch.PageNumber - 1) * request.AdminDetailSearch.PageSize).Take(request.AdminDetailSearch.PageSize).ToList();


                var pagedList = new PagedList<AdminDto>(items, queryCount, request.AdminDetailSearch.PageNumber, request.AdminDetailSearch.PageSize);

                return new SuccessDataResult<PagedList<AdminDto>>(pagedList);
            }
        }

    }
}