using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Common.Handlers;
using TurkcellDigitalSchool.Core.Utilities.Requests; 

namespace TurkcellDigitalSchool.Account.Business.Handlers.MessageMaps.Queries
{
    public class GetMessageMapQuery : QueryByIdRequestBase<MessageMap>
    {
        public class GetMessageMapQueryHandler : QueryByIdBase<MessageMap, GetMessageMapQuery>
        {
            public GetMessageMapQueryHandler(IMessageMapRepository messageMapRepository) : base(messageMapRepository)
            {
            }
        }
    }
}
