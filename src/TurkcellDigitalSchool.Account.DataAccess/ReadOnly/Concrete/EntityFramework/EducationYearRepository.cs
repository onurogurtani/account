using TurkcellDigitalSchool.Account.DataAccess.DataAccess.Contexts;
using TurkcellDigitalSchool.Account.DataAccess.ReadOnly.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete.ReadOnly;
using TurkcellDigitalSchool.Core.DataAccess.EntityFramework;

namespace TurkcellDigitalSchool.Account.DataAccess.ReadOnly.Concrete.EntityFramework
{
    public class EducationYearRepository : EfEntityReadRepositoryBase<EducationYear, AccountDbContext>, IEducationYearRepository
    {
        public EducationYearRepository(AccountDbContext context) : base(context)
        {
        }
    }
}
