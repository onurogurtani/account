using System.Linq;
using System.Text.RegularExpressions;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Common.Constants;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.Results;

namespace TurkcellDigitalSchool.Account.Business.Handlers.GreetingMessages.Commands
{
    [LogScope]
    [SecuredOperationScope]
    public class SetGreetingMessageRecordStatusCommand : IRequest<IResult>
    {
        public long Id { get; set; }
        public RecordStatus RecordStatus { get; set; }
        public class SetGreetingMessageRecordStatusCommandHandler : IRequestHandler<SetGreetingMessageRecordStatusCommand, IResult>
        {
            private readonly IGreetingMessageRepository _greetingMessageRepository;

            public SetGreetingMessageRecordStatusCommandHandler(IGreetingMessageRepository greetingMessageRepository)
            {
                _greetingMessageRepository = greetingMessageRepository;
            }
             
            public async Task<IResult> Handle(SetGreetingMessageRecordStatusCommand request, CancellationToken cancellationToken)
            {
                var entity = await _greetingMessageRepository.GetAsync(x => x.Id == request.Id);

                if (entity == null)
                {
                    return new ErrorDataResult<IResult>(Messages.RecordDoesNotExist);
                }

                entity.RecordStatus = request.RecordStatus;
                await _greetingMessageRepository.UpdateAndSaveAsync(entity);

                return new SuccessResult(Messages.SuccessfulOperation);
            }
        }


    }
}
