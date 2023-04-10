using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Core.DataAccess.EntityFramework;
using TurkcellDigitalSchool.DbAccess.DataAccess.Contexts;
using TurkcellDigitalSchool.Entities.Concrete;

namespace TurkcellDigitalSchool.Account.DataAccess.Concrete.EntityFramework
{
    public class MessageTypeRepository : EfEntityRepositoryBase<MessageType, ProjectDbContext>, IMessageTypeRepository
    {
        public MessageTypeRepository(ProjectDbContext context) : base(context)
        {
        }
    }
}
