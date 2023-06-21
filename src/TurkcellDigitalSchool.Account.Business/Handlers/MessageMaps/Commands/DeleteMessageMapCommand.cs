using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.Common.Handlers;
using TurkcellDigitalSchool.Core.Utilities.Requests; 

namespace TurkcellDigitalSchool.Account.Business.Handlers.MessageMaps.Commands
{
    public class DeleteMessageMapCommand : DeleteRequestBase<MessageMap>
    {
        public class DeleteRequestMessageMapCommandHandler : DeleteRequestHandlerBase<MessageMap, DeleteMessageMapCommand>
        {
            public DeleteRequestMessageMapCommandHandler(IMessageMapRepository repository) : base(repository)
            {
            }
        }
    }
}

