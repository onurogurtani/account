using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TurkcellDigitalSchool.Common.BusinessAspects;
using TurkcellDigitalSchool.Core.Aspects.Autofac.Logging;
using TurkcellDigitalSchool.Core.CrossCuttingConcerns.Logging.Serilog.Loggers;
using TurkcellDigitalSchool.Core.Utilities.Paging;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Entities.Dtos.RoleDtos;
using TurkcellDigitalSchool.Identity.DataAccess.Abstract;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Roles.Queries
{
    ///<summary>
    ///Get Filtered Paged Role with relation data 
    ///</summary>
    ///<remarks>OrderBy default "UpdateTimeDESC" also can be "NameASC","NameDESC","RecordStatusASC","RecordStatusDESC","IsOrganisationViewASC","IsOrganisationViewDESC","InsertTimeASC","InsertTimeDESC","UpdateTimeASC","UpdateTimeDESC","IdASC","IdDESC" </remarks>
    public class GetByFilterPagedRolesQuery : IRequest<IDataResult<PagedList<GetRoleDto>>>
    {
        public RoleDetailSearch RoleDetailSearch { get; set; } = new RoleDetailSearch();

        public class GetByFilterPagedRolesQueryHandler : IRequestHandler<GetByFilterPagedRolesQuery, IDataResult<PagedList<GetRoleDto>>>
        {
            private readonly IRoleRepository _roleRepository;
            private readonly IMapper _mapper;

            public GetByFilterPagedRolesQueryHandler(IRoleRepository roleRepository, IMapper mapper)
            {
                _roleRepository = roleRepository;
                _mapper = mapper;
            }

            [LogAspect(typeof(FileLogger))]
            [SecuredOperation(Priority = 1)]
            public virtual async Task<IDataResult<PagedList<GetRoleDto>>> Handle(GetByFilterPagedRolesQuery request, CancellationToken cancellationToken)
            {
                var query = _roleRepository.Query()
                    .Include(x => x.RoleClaims)
                    .AsQueryable();

                if (request.RoleDetailSearch.RoleIds?.Length > 0)
                    query = query.Where(x => request.RoleDetailSearch.RoleIds.Contains(x.Id));

                if (request.RoleDetailSearch.ClaimNames?.Length > 0)
                    query = query.Where(x => x.RoleClaims.Any(q => request.RoleDetailSearch.ClaimNames.Contains(q.ClaimName)));

                if (request.RoleDetailSearch.IsOrganisationView != null)
                    query = query.Where(x => x.IsOrganisationView == request.RoleDetailSearch.IsOrganisationView);

                if (request.RoleDetailSearch.RecordStatus != null)
                    query = query.Where(x => x.RecordStatus == request.RoleDetailSearch.RecordStatus);

                query = request.RoleDetailSearch.OrderBy switch
                {
                    "NameASC" => query.OrderBy(x => x.Name),
                    "NameDESC" => query.OrderByDescending(x => x.Name),
                    "RecordStatusASC" => query.OrderBy(x => x.RecordStatus),
                    "RecordStatusDESC" => query.OrderByDescending(x => x.RecordStatus),
                    "IsOrganisationViewASC" => query.OrderBy(x => x.IsOrganisationView),
                    "IsOrganisationViewDESC" => query.OrderByDescending(x => x.IsOrganisationView),
                    "InsertTimeASC" => query.OrderBy(x => x.InsertTime),
                    "InsertTimeDESC" => query.OrderByDescending(x => x.InsertTime),
                    "UpdateTimeASC" => query.OrderBy(x => x.UpdateTime),
                    "UpdateTimeDESC" => query.OrderByDescending(x => x.UpdateTime),
                    "IdASC" => query.OrderBy(x => x.Id),
                    "IdDESC" => query.OrderByDescending(x => x.Id),
                    _ => query.OrderByDescending(x => x.UpdateTime),
                };

                var datas = await query.Skip((request.RoleDetailSearch.PageNumber - 1) * request.RoleDetailSearch.PageSize)
                    .Take(request.RoleDetailSearch.PageSize)
                    .ToListAsync();

                var items = _mapper.Map<List<GetRoleDto>>(datas);

                var pagedList = new PagedList<GetRoleDto>(items, query.Count(), request.RoleDetailSearch.PageNumber, request.RoleDetailSearch.PageSize);

                return new SuccessDataResult<PagedList<GetRoleDto>>(pagedList);
            }
        }
    }
}
