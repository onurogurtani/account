using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Core.DataAccess.EntityFramework;
using TurkcellDigitalSchool.DbAccess.DataAccess.Contexts;
using TurkcellDigitalSchool.Entities.Concrete.Core;

namespace TurkcellDigitalSchool.Account.DataAccess.Concrete.EntityFramework
{
    public class UserRoleRepository : EfEntityRepositoryBase<UserRole, ProjectDbContext>, IUserRoleRepository
    {
        public UserRoleRepository(ProjectDbContext context) : base(context)
        {
        }

        public async Task SetTransferRole(long roleId, long transferRoleId)
        {
            var userList = await Context.UserRoles.Where(x => x.RoleId == roleId).ToListAsync();
            foreach (var user in userList)
            {
                user.RoleId = transferRoleId;
            }
            Context.UserRoles.UpdateRange(userList);
            base.SaveChanges();
        }
    }
}
