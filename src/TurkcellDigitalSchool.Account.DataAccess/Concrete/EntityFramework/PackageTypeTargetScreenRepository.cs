using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Core.DataAccess.EntityFramework;
using TurkcellDigitalSchool.DbAccess.DataAccess.Contexts;
using TurkcellDigitalSchool.Entities.Concrete;

namespace TurkcellDigitalSchool.Account.DataAccess.Concrete.EntityFramework
{
    public class PackageTypeTargetScreenRepository : EfEntityRepositoryBase<PackageTypeTargetScreen, ProjectDbContext>, IPackageTypeTargetScreenRepository
    {
        public PackageTypeTargetScreenRepository(ProjectDbContext context) : base(context)
        {
        }
    }
}
