﻿using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Common.BusinessAspects;
using TurkcellDigitalSchool.Core.Aspects.Autofac.Logging;
using TurkcellDigitalSchool.Core.CrossCuttingConcerns.Logging.Serilog.Loggers;
using TurkcellDigitalSchool.Core.Utilities.Paging;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Entities.Concrete;
using TurkcellDigitalSchool.Entities.Dtos.OrganisationDtos;

namespace TurkcellDigitalSchool.Account.Business.Handlers.OrganisationTypes.Queries
{
    ///<summary>
    ///Get Filtered Paged OrganisationTypes with  IsSingularOrPluralChangeable property
    ///</summary>
    ///<remarks></remarks>
    public class GetByFilterPagedOrganisationTypesQuery : IRequest<IDataResult<PagedList<OrganisationTypeDto>>>
    {
        public PaginationQuery PaginationQuery { get; set; } = new PaginationQuery();
        public class GetByFilterPagedOrganisationTypesQueryHandler : IRequestHandler<GetByFilterPagedOrganisationTypesQuery, IDataResult<PagedList<OrganisationTypeDto>>>
        {
            private readonly IOrganisationTypeRepository _organisationTypeRepository;
            private readonly IOrganisationRepository _organisationRepository;
            private readonly IMapper _mapper;

            public GetByFilterPagedOrganisationTypesQueryHandler(IOrganisationTypeRepository organisationTypeRepository, IMapper mapper, IOrganisationRepository organisationRepository)
            {
                _organisationTypeRepository = organisationTypeRepository;
                _organisationRepository = organisationRepository;
                _mapper = mapper;
            }

            [LogAspect(typeof(FileLogger))]
            [SecuredOperation(Priority = 1)]
            public virtual async Task<IDataResult<PagedList<OrganisationTypeDto>>> Handle(GetByFilterPagedOrganisationTypesQuery request, CancellationToken cancellationToken)
            {
                var query = _organisationTypeRepository.Query()
                    .AsQueryable();

                var items = await query.Skip((request.PaginationQuery.PageNumber - 1) * request.PaginationQuery.PageSize)
                .Take(request.PaginationQuery.PageSize)
                        .ToListAsync();
                var organisationTypeDtos = _mapper.Map<List<OrganisationType>, List<OrganisationTypeDto>>(items);

                foreach ( var item in organisationTypeDtos) {
                    // İlgili türe ait organizasyon var ise IsSingularOrPluralChangeable bunun tersi olmalı. İşlemin sonunda ! ifadesi var.
                    bool hasOrganisation = await _organisationRepository.Query().AnyAsync(x => x.OrganisationTypeId == item.Id);
                    item.IsSingularOrPluralChangeable = !hasOrganisation;
                }

                var pagedList = new PagedList<OrganisationTypeDto>(organisationTypeDtos, query.Count(), request.PaginationQuery.PageNumber, request.PaginationQuery.PageSize);


                return new SuccessDataResult<PagedList<OrganisationTypeDto>>(pagedList);
            }
        }

    }
}