using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.DataAccess.DataAccess.Contexts;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.DataAccess.EntityFramework; 

namespace TurkcellDigitalSchool.Account.DataAccess.Concrete.EntityFramework
{
    public class CountyRepository : EfEntityRepositoryBase<County, AccountDbContext>, ICountyRepository
    {
        public CountyRepository(AccountDbContext context) : base(context)
        {
        }
    }
}
