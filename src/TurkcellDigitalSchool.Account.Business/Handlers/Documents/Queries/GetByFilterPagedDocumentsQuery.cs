using System.Collections.Generic;
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
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.Paging;
using TurkcellDigitalSchool.Core.Utilities.Results;

namespace TurkcellDigitalSchool.Account.Business.Handlers.Documents.Queries
{
    ///<summary>
    ///Get Filtered Paged Documents with relation data 
    ///</summary>
    ///<remarks>OrderBy default "IdDESC" also can be "RecordStatusASC","RecordStatusDESC","ContractKindASC","ContractKindDESC","ContractTypeASC","ContractTypeDESC","ContentASC","ContentDESC","VersionASC","VersionDESC","ValidStartDateASC","ValidStartDateDESC","ValidEndDateASC","ValidEndDateDESC","IdASC","IdDESC","InsertTimeASC","InsertTimeDESC","UpdateTimeASC","UpdateTimeDESC"  </remarks>
    [LogScope]
    public class GetByFilterPagedDocumentsQuery : IRequest<IDataResult<PagedList<DocumentDto>>>
    {
        public DocumentDetailSearch DocumentDetailSearch { get; set; } = new DocumentDetailSearch();

        public class GetByFilterPagedDocumentsQueryHandler : IRequestHandler<GetByFilterPagedDocumentsQuery, IDataResult<PagedList<DocumentDto>>>
        {
            private readonly IDocumentRepository _documentRepository;
            private readonly IMapper _mapper;
            private readonly IUserRepository _userRepository;

            public GetByFilterPagedDocumentsQueryHandler(IDocumentRepository documentRepository, IUserRepository userRepository, IMapper mapper)
            {
                _documentRepository = documentRepository;
                _mapper = mapper;
                _userRepository = userRepository;
            } 
             
            [SecuredOperation]
            public virtual async Task<IDataResult<PagedList<DocumentDto>>> Handle(GetByFilterPagedDocumentsQuery request, CancellationToken cancellationToken)
            {
                var query = _documentRepository.Query()
                   .Include(x => x.ContractTypes).ThenInclude(x => x.ContractType)
                   .Include(x => x.ContractKind).AsQueryable();

                if (!string.IsNullOrWhiteSpace(request.DocumentDetailSearch.ContractKindName))
                    query = query.Where(x => x.ContractKind.Name.Contains(request.DocumentDetailSearch.ContractKindName));

                if (request.DocumentDetailSearch.ContractTypeIds.Length > 0)
                    query = query.Where(x => x.ContractTypes.Any(s => request.DocumentDetailSearch.ContractTypeIds.Contains(s.ContractTypeId)));


                if (request.DocumentDetailSearch.ContractKindIds.Length > 0)
                    query = query.Where(x => request.DocumentDetailSearch.ContractKindIds.Contains((long)x.ContractKindId));

                if (request.DocumentDetailSearch.RecordStatus != null)
                    query = query.Where(x => x.RecordStatus == (RecordStatus)request.DocumentDetailSearch.RecordStatus);


                if (request.DocumentDetailSearch.ValidEndDate.HasValue)
                    query = query.Where(x =>
                    x.ValidEndDate <= request.DocumentDetailSearch.ValidEndDate);

                if (request.DocumentDetailSearch.ValidStartDate.HasValue)
                    query = query.Where(x =>
                    x.ValidStartDate >= request.DocumentDetailSearch.ValidStartDate);

                query = request.DocumentDetailSearch.OrderBy switch
                {
                    "RecordStatusASC" => query.OrderBy(x => x.RecordStatus),
                    "RecordStatusDESC" => query.OrderByDescending(x => x.RecordStatus),
                    "ContractKindASC" => query.OrderBy(x => x.ContractKind.Name),
                    "ContractKindDESC" => query.OrderByDescending(x => x.ContractKind.Name),
                    "ContractTypeASC" => query.OrderBy(x => x.ContractTypes.First().ContractType.Name),
                    "ContractTypeDESC" => query.OrderByDescending(x => x.ContractTypes.First().ContractType.Name),
                     "ContentASC" => query.OrderBy(x => x.Content),
                    "ContentDESC" => query.OrderByDescending(x => x.Content),
                    "VersionASC" => query.OrderBy(x => x.Version),
                    "VersionDESC" => query.OrderByDescending(x => x.Version),
                    "ValidStartDateASC" => query.OrderBy(x => x.ValidStartDate),
                    "ValidStartDateDESC" => query.OrderByDescending(x => x.ValidStartDate),
                    "ValidEndDateASC" => query.OrderBy(x => x.ValidEndDate),
                    "ValidEndDateDESC" => query.OrderByDescending(x => x.ValidEndDate),
                    "IdASC" => query.OrderBy(x => x.Id),
                    "IdDESC" => query.OrderByDescending(x => x.Id),
                    "InsertTimeASC" => query.OrderBy(x => x.InsertTime),
                    "InsertTimeDESC" => query.OrderByDescending(x => x.InsertTime),
                    "UpdateTimeASC" => query.OrderBy(x => x.UpdateTime == null ? x.InsertTime : x.UpdateTime),
                    "UpdateTimeDESC" => query.OrderByDescending(x => x.UpdateTime == null ? x.InsertTime : x.UpdateTime),
                    _ => query.OrderByDescending(x => x.Id),
                };

                var items = await query.Skip((request.DocumentDetailSearch.PageNumber - 1) * request.DocumentDetailSearch.PageSize)
                    .Take(request.DocumentDetailSearch.PageSize)
                    .ToListAsync();



                var dtos = _mapper.Map<List<DocumentDto>>(items);


                foreach (var eventDto in dtos)
                {
                    if (eventDto.UpdateUserId != null)
                        eventDto.UpdateUserFullName = _userRepository.Get(x => x.Id == (long)eventDto.UpdateUserId)?.NameSurname;
                    if (eventDto.InsertUserId != null)
                        eventDto.InsertUserFullName = _userRepository.Get(x => x.Id == (long)eventDto.InsertUserId)?.NameSurname;
                }



                var pagedList = new PagedList<DocumentDto>(dtos, query.Count(), request.DocumentDetailSearch.PageNumber, request.DocumentDetailSearch.PageSize);

                return new SuccessDataResult<PagedList<DocumentDto>>(pagedList);
            }
        }

    }
}