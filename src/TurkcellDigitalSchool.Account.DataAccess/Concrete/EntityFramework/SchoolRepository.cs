using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Core.DataAccess.EntityFramework;
using TurkcellDigitalSchool.DbAccess.DataAccess.Contexts;
using TurkcellDigitalSchool.Entities.Concrete;

namespace TurkcellDigitalSchool.Account.DataAccess.Concrete.EntityFramework
{
    public class SchoolRepository : EfEntityRepositoryBase<School, ProjectDbContext>, ISchoolRepository
    {
        public SchoolRepository(ProjectDbContext context) : base(context)
        {
        }
    }
}
