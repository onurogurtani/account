using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Core.DataAccess.EntityFramework;
using TurkcellDigitalSchool.DbAccess.DataAccess.Contexts;
using TurkcellDigitalSchool.Entities.Concrete;

namespace TurkcellDigitalSchool.Account.DataAccess.Concrete.EntityFramework
{
    public class PackagePublisherRepository : EfEntityRepositoryBase<PackagePublisher, ProjectDbContext>, IPackagePublisherRepository
    {
        public PackagePublisherRepository(ProjectDbContext context) : base(context)
        {
        }
    }
}
