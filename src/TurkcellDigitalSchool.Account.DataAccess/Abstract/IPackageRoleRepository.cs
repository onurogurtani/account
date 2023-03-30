using System.Threading.Tasks;
using TurkcellDigitalSchool.Core.DataAccess;
using TurkcellDigitalSchool.Entities.Concrete;

namespace TurkcellDigitalSchool.Account.DataAccess.Abstract
{
    public interface IPackageRoleRepository : IEntityDefaultRepository<PackageRole>
    {
        public Task SetTransferRole(long roleId, long transferRoleId);
    }
}