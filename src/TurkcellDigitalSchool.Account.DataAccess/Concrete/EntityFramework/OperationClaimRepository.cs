using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Core.DataAccess.EntityFramework;
using TurkcellDigitalSchool.DbAccess.DataAccess.Contexts;
using TurkcellDigitalSchool.Entities.Concrete.Core;

namespace TurkcellDigitalSchool.Account.DataAccess.Concrete.EntityFramework
{
    public class OperationClaimRepository : EfEntityRepositoryBase<OperationClaim, ProjectDbContext>, IOperationClaimRepository
    {
        public OperationClaimRepository(ProjectDbContext context) : base(context)
        {
        }
    }
}
