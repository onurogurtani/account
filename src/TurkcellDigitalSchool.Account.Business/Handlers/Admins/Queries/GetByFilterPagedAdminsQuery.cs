using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Dtos;
using TurkcellDigitalSchool.Core.Behaviors.Abstraction;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Common.Constants; 
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.Paging;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Core.Utilities.Security.Jwt;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Admins.Queries
{
    ///<summary>
    ///Get Filtered Paged Admins  with Roles
    /// </summary>
    [LogScope]
     
    public class GetByFilterPagedAdminsQuery : IRequest<DataResult<PagedList<AdminDto>>>, IUnLogable
    {
        public AdminDetailSearch AdminDetailSearch { get; set; } = new AdminDetailSearch();

        public class GetByFilterPagedAdminsQueryHandler : IRequestHandler<GetByFilterPagedAdminsQuery, DataResult<PagedList<AdminDto>>>
        {
            private readonly IUserRepository _userRepository;
            private readonly IUserRoleRepository _userRoleRepository;
            private readonly IOrganisationUserRepository _organisationUserRepository;
            private readonly ITokenHelper _tokenHelper;

            public GetByFilterPagedAdminsQueryHandler(IUserRepository userRepository, IUserRoleRepository userRoleRepository, IOrganisationUserRepository organisationUserRepository, ITokenHelper tokenHelper)
            {
                _userRepository = userRepository;
                _organisationUserRepository = organisationUserRepository;
                _tokenHelper = tokenHelper;
                _userRoleRepository = userRoleRepository;
            }

            public virtual async Task<DataResult<PagedList<AdminDto>>> Handle(GetByFilterPagedAdminsQuery request, CancellationToken cancellationToken)
            {
                long currentUserId = _tokenHelper.GetUserIdByCurrentToken();
                var currentUser = await _userRepository.GetAsync(p => p.Id == currentUserId);

                if (currentUser.UserType !=  UserType.Admin && currentUser.UserType != UserType.OrganisationAdmin && currentUser.UserType != UserType.FranchiseAdmin)
                    return new ErrorDataResult<PagedList<AdminDto>>(Messages.AutorizationRoleError);

                var query = _userRepository.Query()
                            .Where(x => x.UserType == UserType.Admin || x.UserType == UserType.OrganisationAdmin || x.UserType == UserType.FranchiseAdmin)
                            .Where(x=>x.RegisterStatus == RegisterStatus.Registered)
                            .Include(cc => cc.UserRoles).ThenInclude(rol => rol.Role)
                            .Include(cc => cc.OrganisationUsers).ThenInclude(org => org.Organisation)
                            .AsQueryable();

                if (request.AdminDetailSearch.RoleIds.Any())
                {
                    long[] userIds = _userRoleRepository.Query().Where(w => request.AdminDetailSearch.RoleIds.Contains(w.RoleId)).Select(s => s.UserId).ToArray();
                    query = query.Where(w => userIds.Contains(w.Id));
                }

                if (currentUser.UserType == UserType.OrganisationAdmin )
                {
                    var currentOrganisations = _organisationUserRepository.Query().Where(g => g.UserId == currentUserId).Distinct().Select(s => s.OrganisationId).ToList();
                    query = query.Where(x => currentOrganisations.Contains(x.OrganisationUsers.Select(s => s.OrganisationId).FirstOrDefault()) 
                                     && x.UserType == UserType.OrganisationAdmin);
                }

                if (currentUser.UserType == UserType.FranchiseAdmin)
                {
                    //Todo - Alt kurum ilgili çalýþma olduktan sonra geliþtirilecek.
                    var currentOrganisations = _organisationUserRepository.Query().Where(g => g.UserId == currentUserId).Distinct().Select(s => s.OrganisationId).ToList();
                    query = query.Where(x => currentOrganisations.Contains(x.OrganisationUsers.Select(s => s.OrganisationId).FirstOrDefault()) 
                                     && x.UserType == UserType.OrganisationAdmin);
                }

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

                if (request.AdminDetailSearch.UserType != null)
                    query = query.Where(x => x.UserType == request.AdminDetailSearch.UserType);

                if (request.AdminDetailSearch.OrganisationIds.Length > 0)
                    query = query.Where(x => x.OrganisationUsers.Any(s => request.AdminDetailSearch.OrganisationIds.Contains((long)s.OrganisationId)));

                var items = await query.OrderByDescending(x => x.UpdateTime == null ? x.InsertTime : x.UpdateTime).Select(s => new AdminDto
                {
                    UserType = s.UserType,
                    CitizenId = s.CitizenId??0,
                    Email = s.Email,
                    Id = s.Id,
                    MobilePhones = s.MobilePhones,
                    Name = s.Name,
                    Roles = s.UserRoles.Select(ss => new RoleDto
                    {
                        Name = ss.Role.Name,
                        Id = ss.Role.Id
                    }).ToList(),
                    TheInstitutionConnected = s.OrganisationUsers.Select(s=>s.Organisation.Name).FirstOrDefault(),
                    Status = s.Status,
                    SurName = s.SurName,
                    UserName = s.UserType == UserType.OrganisationAdmin ? (s.CitizenId + "") : s.UserName,
                    LastLoginDate = (s.LastMobileSessionTime ?? DateTime.MinValue) > (s.LastWebSessionTime??DateTime.MinValue) ? s.LastMobileSessionTime : s.LastWebSessionTime
                }).ToListAsync();

                items = items.Skip((request.AdminDetailSearch.PageNumber - 1) * request.AdminDetailSearch.PageSize).Take(request.AdminDetailSearch.PageSize).ToList();
                var pagedList = new PagedList<AdminDto>(items, query.Count(), request.AdminDetailSearch.PageNumber, request.AdminDetailSearch.PageSize);

                return new SuccessDataResult<PagedList<AdminDto>>(pagedList);
            }
        }
    }
}