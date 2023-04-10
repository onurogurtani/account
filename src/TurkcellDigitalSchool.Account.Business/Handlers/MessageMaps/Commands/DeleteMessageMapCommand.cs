using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Utilities.Requests;
using TurkcellDigitalSchool.Entities.Concrete.MessageMap;

namespace TurkcellDigitalSchool.Account.Business.Handlers.MessageMaps.Commands
{
    public class DeleteMessageMapCommand : DeleteRequestBase<MessageMap>
    {
        public class DeleteMessageMapCommandHandler : DeleteRequestHandlerBase<MessageMap>
        {
            public DeleteMessageMapCommandHandler(IMessageMapRepository repository) : base(repository)
            {
            }
        }
    }
}

