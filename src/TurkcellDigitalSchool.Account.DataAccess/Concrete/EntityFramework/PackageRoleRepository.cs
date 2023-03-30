using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Core.DataAccess.EntityFramework;
using TurkcellDigitalSchool.DbAccess.DataAccess.Contexts;
using TurkcellDigitalSchool.Entities.Concrete;

namespace TurkcellDigitalSchool.Account.DataAccess.Concrete.EntityFramework
{
    public class PackageRoleRepository : EfEntityRepositoryBase<PackageRole, ProjectDbContext>, IPackageRoleRepository
    {
        public PackageRoleRepository(ProjectDbContext context) : base(context)
        {
        }

        public async Task SetTransferRole(long roleId, long transferRoleId)
        {
            var packageList = await Context.PackageRoles.Where(x => x.RoleId == roleId).ToListAsync();
            foreach (var user in packageList)
            {
                user.RoleId = transferRoleId;
            }
            Context.PackageRoles.UpdateRange(packageList);
            base.SaveChanges();
        }
    }
}
