using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Core.DataAccess.EntityFramework;
using TurkcellDigitalSchool.DbAccess.DataAccess.Contexts;
using TurkcellDigitalSchool.Entities.Concrete;

namespace TurkcellDigitalSchool.Account.DataAccess.Concrete.EntityFramework
{
    public class PackagePackageTypeEnumRepository : EfEntityRepositoryBase<PackagePackageTypeEnum, ProjectDbContext>, IPackagePackageTypeEnumRepository
    {
        public PackagePackageTypeEnumRepository(ProjectDbContext context) : base(context)
        {
        }
    }
}
