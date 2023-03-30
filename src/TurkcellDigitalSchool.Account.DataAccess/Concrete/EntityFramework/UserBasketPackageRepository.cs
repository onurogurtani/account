using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Core.DataAccess.EntityFramework;
using TurkcellDigitalSchool.DbAccess.DataAccess.Contexts;
using TurkcellDigitalSchool.Entities.Concrete;

namespace TurkcellDigitalSchool.Account.DataAccess.Concrete.EntityFramework
{
    public class UserBasketPackageRepository : EfEntityRepositoryBase<UserBasketPackage, ProjectDbContext>, IUserBasketPackageRepository
    {
        public UserBasketPackageRepository(ProjectDbContext context) : base(context)
        {
        }
    }
}
