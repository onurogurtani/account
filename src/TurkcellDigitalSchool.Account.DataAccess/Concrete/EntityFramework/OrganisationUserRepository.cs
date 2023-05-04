using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.DataAccess.DataAccess.Contexts;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.DataAccess.EntityFramework; 

namespace TurkcellDigitalSchool.Account.DataAccess.Concrete.EntityFramework
{
    public class OrganisationUserRepository : EfEntityRepositoryBase<OrganisationUser, AccountDbContext>, IOrganisationUserRepository
    {
        public OrganisationUserRepository(AccountDbContext context) : base(context)
        {
        }
    }
}
