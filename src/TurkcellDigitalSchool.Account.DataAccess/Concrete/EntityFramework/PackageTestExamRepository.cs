using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Core.DataAccess.EntityFramework;
using TurkcellDigitalSchool.DbAccess.DataAccess.Contexts;
using TurkcellDigitalSchool.Entities.Concrete;

namespace TurkcellDigitalSchool.Account.DataAccess.Concrete.EntityFramework
{
    public class PackageTestExamRepository : EfEntityRepositoryBase<PackageTestExam, ProjectDbContext>, IPackageTestExamRepository
    {
        public PackageTestExamRepository(ProjectDbContext context) : base(context)
        {
        }
    }
}
