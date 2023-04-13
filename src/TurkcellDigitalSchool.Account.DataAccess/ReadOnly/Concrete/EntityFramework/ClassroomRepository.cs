using TurkcellDigitalSchool.Account.DataAccess.ReadOnly.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete.ReadOnly;
using TurkcellDigitalSchool.Core.DataAccess.EntityFramework;
using TurkcellDigitalSchool.DbAccess.DataAccess.Contexts;

namespace TurkcellDigitalSchool.Account.DataAccess.ReadOnly.Concrete.EntityFramework
{
    public class ClassroomRepository : EfEntityReadRepositoryBase<Classroom, ProjectDbContext>, IClassroomRepository
    {
        public ClassroomRepository(ProjectDbContext context) : base(context)
        {
        }
    }
}
