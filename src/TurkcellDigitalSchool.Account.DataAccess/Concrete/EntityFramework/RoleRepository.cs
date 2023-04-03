using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Core.DataAccess.EntityFramework;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.DbAccess.DataAccess.Contexts;
using TurkcellDigitalSchool.Entities.Concrete.Core;

namespace TurkcellDigitalSchool.Account.DataAccess.Concrete.EntityFramework
{
    public class RoleRepository : EfEntityRepositoryBase<Role, ProjectDbContext>, IRoleRepository
    {
        public RoleRepository(ProjectDbContext context) : base(context)
        {
        }

        public async Task SetPassiveRole(long roleId)
        {
            var role = await Context.Roles.FirstOrDefaultAsync(x => x.Id == roleId);
            role.RecordStatus = RecordStatus.Passive;
            base.Update(role);
            base.SaveChanges();
        }

        public async Task SetActiveRole(long roleId)
        {
            var role = await Context.Roles.FirstOrDefaultAsync(x => x.Id == roleId);
            role.RecordStatus = RecordStatus.Active;
            base.Update(role);
            base.SaveChanges();
        }
    }
}
