using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Core.DataAccess.EntityFramework;
using TurkcellDigitalSchool.DbAccess.DataAccess.Contexts;
using TurkcellDigitalSchool.Entities.Concrete;

namespace TurkcellDigitalSchool.Account.DataAccess.Concrete.EntityFramework
{
    public class UserPackageRepository : EfEntityRepositoryBase<UserPackage, ProjectDbContext>, IUserPackageRepository
    {
        public UserPackageRepository(ProjectDbContext context) : base(context)
        {
        }
    }
}
