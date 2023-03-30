using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Core.DataAccess.EntityFramework;
using TurkcellDigitalSchool.DbAccess.DataAccess.Contexts;
using TurkcellDigitalSchool.Entities.Concrete;

namespace TurkcellDigitalSchool.Account.DataAccess.Concrete.EntityFramework
{
    public class OrganisationUserRepository : EfEntityRepositoryBase<OrganisationUser, ProjectDbContext>, IOrganisationUserRepository
    {
        public OrganisationUserRepository(ProjectDbContext context) : base(context)
        {
        }
    }
}
