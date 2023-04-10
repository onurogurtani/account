using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Utilities.Requests;
using TurkcellDigitalSchool.Entities.Concrete.MessageMap;

namespace TurkcellDigitalSchool.Account.Business.Handlers.MessageMaps.Queries
{
    public class GetMessageMapQuery : QueryByIdRequestBase<MessageMap>
    {
        public class GetMessageMapQueryHandler : QueryByIdRequestHandlerBase<MessageMap>
        {
            public GetMessageMapQueryHandler(IMessageMapRepository messageMapRepository) : base(messageMapRepository)
            {
            }
        }
    }
}
