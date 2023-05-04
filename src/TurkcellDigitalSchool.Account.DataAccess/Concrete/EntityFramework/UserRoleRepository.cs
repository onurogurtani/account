using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.DataAccess.DataAccess.Contexts;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.DataAccess.EntityFramework;  

namespace TurkcellDigitalSchool.Account.DataAccess.Concrete.EntityFramework
{
    public class UserRoleRepository : EfEntityRepositoryBase<UserRole, AccountDbContext>, IUserRoleRepository
    {
        public UserRoleRepository(AccountDbContext context) : base(context)
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
