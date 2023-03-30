using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Core.DataAccess.EntityFramework;
using TurkcellDigitalSchool.DbAccess.DataAccess.Contexts;
using TurkcellDigitalSchool.Entities.Concrete.Core;

namespace TurkcellDigitalSchool.Account.DataAccess.Concrete.EntityFramework
{
    public class RoleClaimRepository : EfEntityRepositoryBase<RoleClaim, ProjectDbContext>, IRoleClaimRepository
    {
        public RoleClaimRepository(ProjectDbContext context) : base(context)
        {
        }
    }
}
