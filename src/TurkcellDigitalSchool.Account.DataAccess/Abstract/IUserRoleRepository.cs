using System.Threading.Tasks;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.DataAccess; 

namespace TurkcellDigitalSchool.Account.DataAccess.Abstract
{
    public interface IUserRoleRepository : IEntityDefaultRepository<UserRole>
    {
        public Task SetTransferRole(long roleId, long transferRoleId);
    }
}