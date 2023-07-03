using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Common.Handlers;
using TurkcellDigitalSchool.Core.Utilities.Requests;

namespace TurkcellDigitalSchool.Account.Business.Handlers.GreetingMessages.Commands
{
    [ExcludeFromCodeCoverage]
    [SecuredOperationScope]
    [LogScope]

    public class DeleteGreetingMessageCommand : DeleteRequestBase<GreetingMessage>
    {
        public class DeleteRequestGreetingMessageCommandHandler : DeleteRequestHandlerBase<GreetingMessage, DeleteGreetingMessageCommand>
        {
            public DeleteRequestGreetingMessageCommandHandler(IGreetingMessageRepository repository) : base(repository)
            {
            }
        }
    }
}

