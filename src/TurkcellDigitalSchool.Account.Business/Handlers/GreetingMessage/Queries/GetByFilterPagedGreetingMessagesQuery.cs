using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Dtos;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.Paging;
using TurkcellDigitalSchool.Core.Utilities.Results;

namespace TurkcellDigitalSchool.Account.Business.Handlers.GreetingMessages.Queries
{
    ///<summary>
    ///Get Filtered Paged GreetingMessages with relation data 
    ///</summary>
    ///<remarks>OrderBy default "IdDESC" also can be "RecordStatusASC","RecordStatusDESC","ContractKindASC","ContractKindDESC","ContractTypeASC","ContractTypeDESC","ContentASC","ContentDESC","VersionASC","VersionDESC","ValidStartDateASC","ValidStartDateDESC","ValidEndDateASC","ValidEndDateDESC","IdASC","IdDESC","InsertTimeASC","InsertTimeDESC","UpdateTimeASC","UpdateTimeDESC"  </remarks>
    [LogScope]
    [SecuredOperationScope]
    public class GetByFilterPagedGreetingMessagesQuery : IRequest<DataResult<PagedList<GreetingMessageDto>>>
    {
        public GreetingMessageDetailSearch GreetingMessageDetailSearch { get; set; } = new ();

        public class GetByFilterPagedGreetingMessagesQueryHandler : IRequestHandler<GetByFilterPagedGreetingMessagesQuery, DataResult<PagedList<GreetingMessageDto>>>
        {
            private readonly IGreetingMessageRepository _greetingMessageRepository;
            private readonly IMapper _mapper;

            public GetByFilterPagedGreetingMessagesQueryHandler(IGreetingMessageRepository greetingMessageRepository, IMapper mapper)
            {
                _greetingMessageRepository = greetingMessageRepository;
                _mapper = mapper;
            } 
             

            public  async Task<DataResult<PagedList<GreetingMessageDto>>> Handle(GetByFilterPagedGreetingMessagesQuery request, CancellationToken cancellationToken)
            {
                var query = _greetingMessageRepository.Query()
                    .Where(w => w.HasDateRange == request.GreetingMessageDetailSearch.HasDateRange)        
                    .AsQueryable();

                query = request.GreetingMessageDetailSearch.HasDateRange switch
                {
                    true => query.OrderBy(x => x.StartDate),
                    false => query.OrderBy(x => x.Order),
                };

                var items = await query.Skip((request.GreetingMessageDetailSearch.PageNumber - 1) * request.GreetingMessageDetailSearch.PageSize)
                    .Take(request.GreetingMessageDetailSearch.PageSize)
                    .ToListAsync();

                var dtos = _mapper.Map<List<GreetingMessageDto>>(items);

                var pagedList = new PagedList<GreetingMessageDto>(dtos, query.Count(), request.GreetingMessageDetailSearch.PageNumber, request.GreetingMessageDetailSearch.PageSize);

                return new SuccessDataResult<PagedList<GreetingMessageDto>>(pagedList);
            }
        }

    }
}