using System.Threading.Tasks;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.DataAccess; 

namespace TurkcellDigitalSchool.Account.DataAccess.Abstract
{
    public interface IUserSessionRepository : IEntityRepository<UserSession>
    {
        UserSession AddUserSession(UserSession entity);
        UserSession GetByToken();
        Task Logout(long id);
    }
}