using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.DataAccess.DataAccess.Contexts;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.DataAccess.EntityFramework;
using TurkcellDigitalSchool.DbAccess.DataAccess.Contexts;

namespace TurkcellDigitalSchool.Account.DataAccess.Concrete.EntityFramework
{
    public class InstitutionTypeRepository : EfEntityRepositoryBase<InstitutionType, AccountDbContext>, IInstitutionTypeRepository
    {
        public InstitutionTypeRepository(AccountDbContext context) : base(context)
        {
        }
    }
}
