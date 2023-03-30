using System.Threading.Tasks;
using TurkcellDigitalSchool.Core.DataAccess;
using TurkcellDigitalSchool.Entities.Concrete.Core;

namespace TurkcellDigitalSchool.Account.DataAccess.Abstract
{
    public interface IRoleRepository : IEntityDefaultRepository<Role>
    {
        Task PassiveOldIsDefaultOrganisationRoles(bool isDefaultOrganisationRole);
        Task SetPassiveRole(long roleId);
        Task SetActiveRole(long roleId);
    }
}