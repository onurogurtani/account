using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.DataAccess.DataAccess.Contexts;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.DataAccess.EntityFramework; 

namespace TurkcellDigitalSchool.Account.DataAccess.Concrete.EntityFramework
{
    public class PackageRoleRepository : EfEntityRepositoryBase<PackageRole, AccountDbContext>, IPackageRoleRepository
    {
        public PackageRoleRepository(AccountDbContext context) : base(context)
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
