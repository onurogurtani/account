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
 
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Utilities.Results;

namespace TurkcellDigitalSchool.Account.Business.Handlers.GreetingMessages.Queries
{
    /// <summary>
    /// Get GreetingMessageDto
    /// </summary>
    [LogScope]
    [SecuredOperationScope]
    public class GetGreetingMessageMaxOrderQuery : IRequest<DataResult<GreetingMessageDto>>
    {
        public class GetGreetingMessageMaxOrderQueryHandler : IRequestHandler<GetGreetingMessageMaxOrderQuery, DataResult<GreetingMessageDto>>
        {
            private readonly IGreetingMessageRepository _greetingMessageRepository;

            public GetGreetingMessageMaxOrderQueryHandler(IGreetingMessageRepository greetingMessageRepository)
            {
                _greetingMessageRepository = greetingMessageRepository;
            }
 
            public virtual async Task<DataResult<GreetingMessageDto>> Handle(GetGreetingMessageMaxOrderQuery request, CancellationToken cancellationToken)
            {
                var query = _greetingMessageRepository.Query().Where(w => w.Order > 0).OrderByDescending(o => o.Order);

                var record = await query.FirstOrDefaultAsync();

                if (record == null)
                {
                    return new SuccessDataResult<GreetingMessageDto>(new GreetingMessageDto { Order = 1 });
                }

                return new SuccessDataResult<GreetingMessageDto>(new GreetingMessageDto { Order = record.Order + 1}); 
            }
        } 
    }
}