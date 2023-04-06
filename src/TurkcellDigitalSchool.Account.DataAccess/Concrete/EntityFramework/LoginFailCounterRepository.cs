using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Core.DataAccess.EntityFramework;
using TurkcellDigitalSchool.DbAccess.DataAccess.Contexts;
using TurkcellDigitalSchool.Entities.Concrete;

namespace TurkcellDigitalSchool.Account.DataAccess.Concrete.EntityFramework
{
    public class LoginFailCounterRepository : EfEntityRepositoryBase<LoginFailCounter, ProjectDbContext>, ILoginFailCounterRepository
    {
        public LoginFailCounterRepository(ProjectDbContext context) : base(context)
        {
        }
    }
}
