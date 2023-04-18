using TurkcellDigitalSchool.Account.DataAccess.ReadOnly.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete.ReadOnly;
using TurkcellDigitalSchool.Core.DataAccess.EntityFramework;
using TurkcellDigitalSchool.DbAccess.DataAccess.Contexts;

namespace TurkcellDigitalSchool.Account.DataAccess.ReadOnly.Concrete.EntityFramework
{
    public class BranchMainFieldRepository : EfEntityReadRepositoryBase<BranchMainField, ProjectDbContext>, IBranchMainFieldRepository
    {
        public BranchMainFieldRepository(ProjectDbContext context) : base(context)
        {
        }
    }
}
