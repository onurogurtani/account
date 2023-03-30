using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Core.DataAccess.EntityFramework;
using TurkcellDigitalSchool.DbAccess.DataAccess.Contexts;
using TurkcellDigitalSchool.Entities.Concrete;

namespace TurkcellDigitalSchool.Account.DataAccess.Concrete.EntityFramework
{
    public class ImageOfPackageRepository : EfEntityRepositoryBase<ImageOfPackage, ProjectDbContext>, IImageOfPackageRepository
    {
        public ImageOfPackageRepository(ProjectDbContext context) : base(context)
        {
        }
    }
}
