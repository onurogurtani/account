using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.DataAccess.DataAccess.Contexts;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.DataAccess.EntityFramework;
using TurkcellDigitalSchool.Core.DataAccess.Contexts;

namespace TurkcellDigitalSchool.Account.DataAccess.Concrete.EntityFramework
{
    public class OrganisationInfoChangeRequestRepository : EfEntityRepositoryBase<OrganisationInfoChangeRequest, AccountDbContext>, IOrganisationInfoChangeRequestRepository
    {
        public OrganisationInfoChangeRequestRepository(AccountDbContext context) : base(context)
        {
        }
    }
}
