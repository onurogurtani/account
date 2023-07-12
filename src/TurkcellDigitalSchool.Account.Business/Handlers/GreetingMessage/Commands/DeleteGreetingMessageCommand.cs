using System.Diagnostics.CodeAnalysis;
using System.Threading.Tasks;
using System.Threading;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Common.Handlers;
using TurkcellDigitalSchool.Core.Utilities.Requests;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Core.Common.Constants;
using TurkcellDigitalSchool.Account.DataAccess.Concrete.EntityFramework;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace TurkcellDigitalSchool.Account.Business.Handlers.GreetingMessages.Commands
{
    [ExcludeFromCodeCoverage]
    [SecuredOperationScope]
    [LogScope]

    public class DeleteGreetingMessageCommand : DeleteRequestBase<GreetingMessage>
    {
        public class DeleteRequestGreetingMessageCommandHandler : DeleteRequestHandlerBase<GreetingMessage, DeleteGreetingMessageCommand>
        {

            private readonly IGreetingMessageRepository _repository;
            public DeleteRequestGreetingMessageCommandHandler(IGreetingMessageRepository repository) : base(repository)
            {
                _repository = repository;
            }
            public override async Task<DataResult<GreetingMessage>> Handle(DeleteGreetingMessageCommand request, CancellationToken cancellationToken)
            {
                var entityToDelete = this._repository.Get(p => p.Id == request.Id);
                if (entityToDelete == null)
                {
                    return new ErrorDataResult<GreetingMessage>(Messages.RecordIsNotFound);
                }
                _repository.Delete(entityToDelete);
                await _repository.SaveChangesAsync();

                if (!entityToDelete.HasDateRange && entityToDelete.Order > 0)
                {
                    var list = await _repository.Query().Where(w => w.Id != request.Id && !w.HasDateRange && w.Order > entityToDelete.Order && !w.IsDeleted).OrderBy(o => o.Order).ToListAsync(cancellationToken);
                    if (list.Any())
                    {
                        uint newOrder = entityToDelete.Order.Value;
                        foreach (var item in list)
                        {
                            item.Order = newOrder++;
                            _repository.Update(item);
                            await _repository.SaveChangesAsync();
                        }
                    }
                }

                return new SuccessDataResult<GreetingMessage>(Messages.Deleted);
            }
            
        }
    }
}

