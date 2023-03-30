using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Core.DataAccess.EntityFramework;
using TurkcellDigitalSchool.DbAccess.DataAccess.Contexts;
using TurkcellDigitalSchool.Entities.Concrete;

namespace TurkcellDigitalSchool.Account.DataAccess.Concrete.EntityFramework
{
    public class InstitutionTypeRepository : EfEntityRepositoryBase<InstitutionType, ProjectDbContext>, IInstitutionTypeRepository
    {
        public InstitutionTypeRepository(ProjectDbContext context) : base(context)
        {
        }
    }
}
