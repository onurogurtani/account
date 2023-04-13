using TurkcellDigitalSchool.Account.DataAccess.ReadOnly.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete.ReadOnly;
using TurkcellDigitalSchool.Core.DataAccess.EntityFramework;
using TurkcellDigitalSchool.DbAccess.DataAccess.Contexts;

namespace TurkcellDigitalSchool.Account.DataAccess.ReadOnly.Concrete.EntityFramework
{
    public class TestExamRepository : EfEntityReadRepositoryBase<TestExam, ProjectDbContext>, ITestExamRepository
    {
        public TestExamRepository(ProjectDbContext context) : base(context)
        {
        }
    }
}
