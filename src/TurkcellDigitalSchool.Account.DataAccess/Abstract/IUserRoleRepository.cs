using System.Threading.Tasks;
using TurkcellDigitalSchool.Core.DataAccess;
using TurkcellDigitalSchool.Entities.Concrete.Core;

namespace TurkcellDigitalSchool.Account.DataAccess.Abstract
{
    public interface IUserRoleRepository : IEntityDefaultRepository<UserRole>
    {
        public Task SetTransferRole(long roleId, long transferRoleId);
    }
}