using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.DataAccess.DataAccess.Contexts;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.DataAccess.EntityFramework; 

namespace TurkcellDigitalSchool.Account.DataAccess.Concrete.EntityFramework
{
    public class UnverifiedUserRepository : EfEntityRepositoryBase<UnverifiedUser, AccountDbContext>, IUnverifiedUserRepository
    {
        public UnverifiedUserRepository(AccountDbContext context) : base(context)
        {
        }
    }
}
