using TurkcellDigitalSchool.Core.DataAccess;
using TurkcellDigitalSchool.Entities.Concrete;

namespace TurkcellDigitalSchool.Account.DataAccess.Abstract
{
    public interface IUnverifiedUserRepository : IEntityDefaultRepository<UnverifiedUser>
    {
    }
}