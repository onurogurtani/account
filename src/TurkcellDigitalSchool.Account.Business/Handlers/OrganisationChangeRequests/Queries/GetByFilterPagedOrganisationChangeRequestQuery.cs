﻿using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Dtos;
using TurkcellDigitalSchool.Common.BusinessAspects;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Utilities.Paging;
using TurkcellDigitalSchool.Core.Utilities.Results; 

namespace TurkcellDigitalSchool.Account.Business.Handlers.OrganisationChangeRequests.Queries
{
    ///<summary>
    ///Get Filtered Paged Role with relation data 
    ///</summary>
    ///<remarks>OrderBy default "UpdateTimeDESC" also can be ""RequestDateASC" ,"RequestDateDESC",  "RequestStateASC","RequestStateDESC", "ResponseStateASC" , "ResponseStateDESC", "CustomerManagerASC", "CustomerManagerDESC","InsertTimeASC","InsertTimeDESC","UpdateTimeASC","UpdateTimeDESC","IdASC","IdDESC" </remarks>
    [LogScope]
    [SecuredOperation]
    public class GetByFilterPagedOrganisationChangeRequestQuery : IRequest<DataResult<PagedList<GetOrganisationInfoChangeRequestDto>>>
    {
        public OrganisationChangeRequestDetailSearch OrganisationChangeRequestDetailSearch { get; set; } = new OrganisationChangeRequestDetailSearch();

        public class GetByFilterPagedOrganisationChangeRequestQueryHandler : IRequestHandler<GetByFilterPagedOrganisationChangeRequestQuery, DataResult<PagedList<GetOrganisationInfoChangeRequestDto>>>
        {
            private readonly IOrganisationInfoChangeRequestRepository _organisationInfoChangeRequestRepository;
            private readonly IMapper _mapper;

            public GetByFilterPagedOrganisationChangeRequestQueryHandler(IOrganisationInfoChangeRequestRepository organisationInfoChangeRequestRepository, IMapper mapper)
            {
                _organisationInfoChangeRequestRepository = organisationInfoChangeRequestRepository;
                _mapper = mapper;
            }
            
            public virtual async Task<DataResult<PagedList<GetOrganisationInfoChangeRequestDto>>> Handle(GetByFilterPagedOrganisationChangeRequestQuery request, CancellationToken cancellationToken)
            {
                var query = _organisationInfoChangeRequestRepository.Query()
                    .Include(x => x.OrganisationChangeReqContents)
                    .Include(x=>x.Organisation)
                    .AsQueryable();

                if (request.OrganisationChangeRequestDetailSearch.Id != null)
                    query = query.Where(x => x.Id == request.OrganisationChangeRequestDetailSearch.Id);

                if (request.OrganisationChangeRequestDetailSearch.RecordStatus != null)
                    query = query.Where(x => x.RequestState == request.OrganisationChangeRequestDetailSearch.RecordStatus);

                if (request.OrganisationChangeRequestDetailSearch.StartDate.HasValue)
                    query = query.Where(x => x.RequestDate >= request.OrganisationChangeRequestDetailSearch.StartDate);

                if (request.OrganisationChangeRequestDetailSearch.FinishDate.HasValue)
                    query = query.Where(x => x.RequestDate.Date < request.OrganisationChangeRequestDetailSearch.FinishDate.Value.AddDays(1));

                query = request.OrganisationChangeRequestDetailSearch.OrderBy switch
                {
                    "RequestDateASC" => query.OrderBy(x => x.RequestDate),
                    "RequestDateDESC" => query.OrderByDescending(x => x.RequestDate),
                    "RequestStateASC" => query.OrderBy(x => x.RequestState),
                    "RequestStateDESC" => query.OrderByDescending(x => x.RequestState),
                    "ResponseStateASC" => query.OrderBy(x => x.ResponseState),
                    "ResponseStateDESC" => query.OrderByDescending(x => x.ResponseState),
                    "CustomerManagerASC" => query.OrderBy(x => x.Organisation.CustomerManager),
                    "CustomerManagerDESC" => query.OrderByDescending(x => x.Organisation.CustomerManager),
                    "InsertTimeASC" => query.OrderBy(x => x.InsertTime),
                    "InsertTimeDESC" => query.OrderByDescending(x => x.InsertTime),
                    "UpdateTimeASC" => query.OrderBy(x => x.UpdateTime),
                    "UpdateTimeDESC" => query.OrderByDescending(x => x.UpdateTime),
                    "IdASC" => query.OrderBy(x => x.Id),
                    "IdDESC" => query.OrderByDescending(x => x.Id),
                    _ => query.OrderByDescending(x => x.UpdateTime),
                };

                var datas = await query.Skip((request.OrganisationChangeRequestDetailSearch.PageNumber - 1) * request.OrganisationChangeRequestDetailSearch.PageSize)
                    .Take(request.OrganisationChangeRequestDetailSearch.PageSize)
                    .ToListAsync();

                var items = _mapper.Map<List<GetOrganisationInfoChangeRequestDto>>(datas);

                var pagedList = new PagedList<GetOrganisationInfoChangeRequestDto>(items, query.Count(), request.OrganisationChangeRequestDetailSearch.PageNumber, request.OrganisationChangeRequestDetailSearch.PageSize);

                return new SuccessDataResult<PagedList<GetOrganisationInfoChangeRequestDto>>(pagedList);
            }
        }
    }
}
