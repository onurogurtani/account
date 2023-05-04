using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.DataAccess.DataAccess.Contexts;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.DataAccess.EntityFramework; 

namespace TurkcellDigitalSchool.Account.DataAccess.Concrete.EntityFramework
{
    public class OrganisationTypeRepository : EfEntityRepositoryBase<OrganisationType, AccountDbContext>, IOrganisationTypeRepository
    {
        public OrganisationTypeRepository(AccountDbContext context) : base(context)
        {
        }
    }
}
