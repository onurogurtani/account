using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Core.DataAccess.EntityFramework;
using TurkcellDigitalSchool.DbAccess.DataAccess.Contexts;
using TurkcellDigitalSchool.Entities.Concrete;

namespace TurkcellDigitalSchool.Account.DataAccess.Concrete.EntityFramework
{
    public class CountyRepository : EfEntityRepositoryBase<County, ProjectDbContext>, ICountyRepository
    {
        public CountyRepository(ProjectDbContext context) : base(context)
        {
        }
    }
}
