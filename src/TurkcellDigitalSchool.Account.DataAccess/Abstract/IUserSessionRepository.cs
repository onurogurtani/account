using System.Threading.Tasks;
using TurkcellDigitalSchool.Core.DataAccess;
using TurkcellDigitalSchool.Entities.Concrete.Core;

namespace TurkcellDigitalSchool.Account.DataAccess.Abstract
{
    public interface IUserSessionRepository : IEntityRepository<UserSession>
    {
        UserSession AddUserSession(UserSession entity);
        UserSession GetByToken();
        Task Logout(long id);
    }
}