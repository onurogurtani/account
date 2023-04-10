using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Core.DataAccess.EntityFramework;
using TurkcellDigitalSchool.DbAccess.DataAccess.Contexts;
using TurkcellDigitalSchool.Entities.Concrete.MessageMap;

namespace TurkcellDigitalSchool.Account.DataAccess.Concrete.EntityFramework
{
    public class MessageMapRepository : EfEntityRepositoryBase<MessageMap, ProjectDbContext>, IMessageMapRepository
    {
        public MessageMapRepository(ProjectDbContext context) : base(context)
        {
        }
    }
}
