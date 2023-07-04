using System.Diagnostics.CodeAnalysis;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Common.Handlers;
using TurkcellDigitalSchool.Core.Behaviors.Atrribute;
using TurkcellDigitalSchool.Core.Utilities.Requests;

namespace TurkcellDigitalSchool.Account.Business.Handlers.GreetingMessages.Queries
{
    [ExcludeFromCodeCoverage]
    [SecuredOperationScope]
    [LogScope]
    public class GetGreetingMessagesQuery : QueryByFilterRequestBase<GreetingMessage>
    {
        public class GetGreetingMessagesQueryHandler : QueryByFilterRequestHandlerBase<GreetingMessage, GetGreetingMessagesQuery>
        {
            public GetGreetingMessagesQueryHandler(IGreetingMessageRepository repository) : base(repository)
            {
            }
        }
    }
}