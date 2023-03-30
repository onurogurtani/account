using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Core.DataAccess.EntityFramework;
using TurkcellDigitalSchool.DbAccess.DataAccess.Contexts;
using TurkcellDigitalSchool.Entities.Concrete;

namespace TurkcellDigitalSchool.Account.DataAccess.Concrete.EntityFramework
{
    public class EducationRepository : EfEntityRepositoryBase<Education, ProjectDbContext>, IEducationRepository
    {
        public EducationRepository(ProjectDbContext context) : base(context)
        {
        }
    }
}
