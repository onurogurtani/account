using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Account.Domain.Dtos;
using TurkcellDigitalSchool.Common.BusinessAspects;
using TurkcellDigitalSchool.Core.Aspects.Autofac.Caching;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.Paging;
using TurkcellDigitalSchool.Core.Utilities.Results; 

namespace TurkcellDigitalSchool.Account.Business.Handlers.ContractKinds.Queries
{
    ///<summary>
    ///Get Filtered Paged ContractKind with relation data 
    ///</summary>
    ///<remarks>OrderBy default "UpdateTimeDESC" also can be "NameASC","NameDESC","RecordStatusASC","RecordStatusDESC","DescriptionASC","DescriptionDESC","IdASC","IdDESC","ContractTypeNameASC","ContractTypeNameDESC"</remarks>
    [LogScope]
    public class GetByFilterPagedContractKindsQuery : IRequest<IDataResult<PagedList<ContractKind>>>
    {
        public ContractKindDto ContractKindDto { get; set; } = new ContractKindDto();
        public class GetByFilterPagedContractKindsQueryHandler : IRequestHandler<GetByFilterPagedContractKindsQuery, IDataResult<PagedList<ContractKind>>>
        {
            private readonly IContractKindRepository _contractKindRepository;

            public GetByFilterPagedContractKindsQueryHandler(IContractKindRepository contractKindRepository, IMapper mapper)
            {
                _contractKindRepository = contractKindRepository;
            }

            [CacheRemoveAspect("Get")] 
            [SecuredOperation]
            public virtual async Task<IDataResult<PagedList<ContractKind>>> Handle(GetByFilterPagedContractKindsQuery request, CancellationToken cancellationToken)
            {
                var query = _contractKindRepository.Query().Include(x => x.ContractType).AsQueryable();

                if (request.ContractKindDto.ContractTypeIds != null)
                    query = query.Where(q => request.ContractKindDto.ContractTypeIds.Contains(q.ContractTypeId));

                if (request.ContractKindDto.IsActive == true)
                    query = query.Where(w=>w.RecordStatus == RecordStatus.Active);

                query = request.ContractKindDto.OrderBy switch
                {
                    "NameASC" => query.OrderBy(x => x.Name),
                    "NameDESC" => query.OrderByDescending(x => x.Name),
                    "ContractTypeNameASC" => query.OrderBy(x => x.ContractType.Name),
                    "ContractTypeNameDESC" => query.OrderByDescending(x => x.ContractType.Name),
                    "RecordStatusASC" => query.OrderBy(x => x.RecordStatus),
                    "RecordStatusDESC" => query.OrderByDescending(x => x.RecordStatus),
                    "DescriptionASC" => query.OrderBy(x => x.Description),
                    "DescriptionDESC" => query.OrderByDescending(x => x.Description),
                    "IdASC" => query.OrderBy(x => x.Id),
                    "IdDESC" => query.OrderByDescending(x => x.Id),
                    _ => query.OrderByDescending(x => x.UpdateTime),
                };
                var items = await query.Skip((request.ContractKindDto.PageNumber - 1) * request.ContractKindDto.PageSize)
                    .Take(request.ContractKindDto.PageSize)
                    .ToListAsync();

                var pagedList = new PagedList<ContractKind>(items, query.Count(), request.ContractKindDto.PageNumber, request.ContractKindDto.PageSize);

                return new SuccessDataResult<PagedList<ContractKind>>(pagedList);
            }
        }
    }
}
