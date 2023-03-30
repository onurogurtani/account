using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Core.DataAccess.EntityFramework;
using TurkcellDigitalSchool.DbAccess.DataAccess.Contexts;
using TurkcellDigitalSchool.Entities.Concrete;

namespace TurkcellDigitalSchool.Account.DataAccess.Concrete.EntityFramework
{
    public class ParentRepository : EfEntityRepositoryBase<Parent, ProjectDbContext>, IParentRepository
    {
        public ParentRepository(ProjectDbContext context) : base(context)
        {
        }
    }
}
