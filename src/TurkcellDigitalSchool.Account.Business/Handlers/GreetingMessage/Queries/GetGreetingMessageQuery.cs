using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Dtos;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Common.Constants;
using TurkcellDigitalSchool.Core.Aspects.Autofac.Caching;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Utilities.Results;

namespace TurkcellDigitalSchool.Account.Business.Handlers.GreetingMessages.Queries
{
    /// <summary>
    /// Get GreetingMessageDto
    /// </summary>
    [LogScope]
    [SecuredOperationScope]
    public class GetGreetingMessageQuery : IRequest<DataResult<GreetingMessageDto>>
    {
        public long Id { get; set; }

        public class GetGreetingMessageQueryHandler : IRequestHandler<GetGreetingMessageQuery, DataResult<GreetingMessageDto>>
        {
            private readonly IGreetingMessageRepository _greetingMessageRepository;
            private readonly IMapper _mapper;

            public GetGreetingMessageQueryHandler(IGreetingMessageRepository greetingMessageRepository, IMapper mapper)

            {
                _greetingMessageRepository = greetingMessageRepository;
                _mapper = mapper;
            }
 
            public virtual async Task<DataResult<GreetingMessageDto>> Handle(GetGreetingMessageQuery request, CancellationToken cancellationToken)
            {
                var query = _greetingMessageRepository.Query()
                    .AsQueryable();


                var record = await query.FirstOrDefaultAsync(x => x.Id == request.Id);

                if (record == null)
                    return new ErrorDataResult<GreetingMessageDto>(null, Messages.RecordIsNotFound);


                var dto = _mapper.Map<GreetingMessageDto>(record);

                return new SuccessDataResult<GreetingMessageDto>(dto, Messages.Deleted); 
            }
        } 
    }
}