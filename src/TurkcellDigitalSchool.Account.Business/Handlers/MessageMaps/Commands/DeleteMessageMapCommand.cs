using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Utilities.Requests; 

namespace TurkcellDigitalSchool.Account.Business.Handlers.MessageMaps.Commands
{
    public class DeleteMessageMapCommand : DeleteRequestBase<MessageMap>
    {
        public class DeleteMessageMapCommandHandler : DeleteHandlerBase<MessageMap, DeleteMessageMapCommand>
        {
            public DeleteMessageMapCommandHandler(IMessageMapRepository repository) : base(repository)
            {
            }
        }
    }
}

