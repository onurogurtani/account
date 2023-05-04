using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.DataAccess.DataAccess.Contexts;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.DataAccess.EntityFramework; 

namespace TurkcellDigitalSchool.Account.DataAccess.Concrete.EntityFramework
{
    public class OrganisationRepository : EfEntityRepositoryBase<Organisation, AccountDbContext>, IOrganisationRepository
    {
        public OrganisationRepository(AccountDbContext context) : base(context)
        {
        }
    }
}
