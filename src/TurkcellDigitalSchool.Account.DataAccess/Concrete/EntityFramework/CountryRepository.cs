using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Core.DataAccess.EntityFramework;
using TurkcellDigitalSchool.DbAccess.DataAccess.Contexts;
using TurkcellDigitalSchool.Entities.Concrete;

namespace TurkcellDigitalSchool.Account.DataAccess.Concrete.EntityFramework
{
    public class CountryRepository : EfEntityRepositoryBase<Country, ProjectDbContext>, ICountryRepository
    {
        public CountryRepository(ProjectDbContext context) : base(context)
        {
        }
    }
}
