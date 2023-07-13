using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Account.Domain.Dtos;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
 
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Utilities.Paging;
using TurkcellDigitalSchool.Core.Utilities.Results; 

namespace TurkcellDigitalSchool.Account.Business.Handlers.ContractTypes.Queries
{
    ///<summary>
    ///Get Filtered Paged ContractType with relation data 
    ///</summary>
    ///<remarks>OrderBy default "UpdateTimeDESC" also can be "NameASC","NameDESC","RecordStatusASC","RecordStatusDESC","DescriptionASC","DescriptionDESC","IdASC","IdDESC"</remarks>
    [ExcludeFromCodeCoverage]
    [LogScope] 
    public class GetByFilterPagedContractTypesQuery : IRequest<DataResult<PagedList<ContractType>>>
    {
        public ContractTypeDto ContractTypeDto { get; set; } = new ContractTypeDto();
        public class GetByFilterPagedContractTypesQueryHandler : IRequestHandler<GetByFilterPagedContractTypesQuery, DataResult<PagedList<ContractType>>>
        {
            private readonly IContractTypeRepository _contractTypeRepository;

            public GetByFilterPagedContractTypesQueryHandler(IContractTypeRepository contractTypeRepository)
            {
                _contractTypeRepository = contractTypeRepository;
            }

             
            public virtual async Task<DataResult<PagedList<ContractType>>> Handle(GetByFilterPagedContractTypesQuery request, CancellationToken cancellationToken)
            {
                var query = _contractTypeRepository.Query().AsQueryable();

                query = request.ContractTypeDto.OrderBy switch
                {
                    "NameASC" => query.OrderBy(x => x.Name),
                    "NameDESC" => query.OrderByDescending(x => x.Name),
                    "RecordStatusASC" => query.OrderBy(x => x.RecordStatus),
                    "RecordStatusDESC" => query.OrderByDescending(x => x.RecordStatus),
                    "DescriptionASC" => query.OrderBy(x => x.Description),
                    "DescriptionDESC" => query.OrderByDescending(x => x.Description),
                    "IdASC" => query.OrderBy(x => x.Id),
                    "IdDESC" => query.OrderByDescending(x => x.Id),
                    _ => query.OrderByDescending(x => x.UpdateTime),
                };

                var items = await query.Skip((request.ContractTypeDto.PageNumber - 1) * request.ContractTypeDto.PageSize)
                    .Take(request.ContractTypeDto.PageSize)
                    .ToListAsync();

                var pagedList = new PagedList<ContractType>(items, query.Count(), request.ContractTypeDto.PageNumber, request.ContractTypeDto.PageSize);

                return new SuccessDataResult<PagedList<ContractType>>(pagedList);
            }
        }
    }
}
