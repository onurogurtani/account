using System.Threading.Tasks;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.DataAccess;

namespace TurkcellDigitalSchool.Account.DataAccess.Abstract
{
    public interface IPackageRoleRepository : IEntityDefaultRepository<PackageRole>
    {
        public Task SetTransferRole(long roleId, long transferRoleId);
    }
}