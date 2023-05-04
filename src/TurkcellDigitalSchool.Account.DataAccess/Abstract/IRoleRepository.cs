using System.Threading.Tasks;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.DataAccess; 

namespace TurkcellDigitalSchool.Account.DataAccess.Abstract
{
    public interface IRoleRepository : IEntityDefaultRepository<Role>
    {
        Task SetPassiveRole(long roleId);
        Task SetActiveRole(long roleId);
    }
}