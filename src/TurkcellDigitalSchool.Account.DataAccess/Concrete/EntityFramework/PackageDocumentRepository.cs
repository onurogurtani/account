using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Core.DataAccess.EntityFramework;
using TurkcellDigitalSchool.DbAccess.DataAccess.Contexts;
using TurkcellDigitalSchool.Entities.Concrete;

namespace TurkcellDigitalSchool.Account.DataAccess.Concrete.EntityFramework
{
    public class PackageDocumentRepository : EfEntityRepositoryBase<PackageDocument, ProjectDbContext>, IPackageDocumentRepository
    {
        public PackageDocumentRepository(ProjectDbContext context) : base(context)
        {
        }
    }
}
