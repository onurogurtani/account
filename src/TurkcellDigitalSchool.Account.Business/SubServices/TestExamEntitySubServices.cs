using System.Threading.Tasks;
using DotNetCore.CAP;
using TurkcellDigitalSchool.Account.DataAccess.DataAccess.Contexts;
using TurkcellDigitalSchool.Account.Domain.Concrete.ReadOnly;
using TurkcellDigitalSchool.Core.SubServices;

namespace TurkcellDigitalSchool.Account.Business.SubServices
{
    public class TestExamEntitySubServices : BaseCrudSubServices<AccountSubscribeDbContext, TestExam>
    {
        public TestExamEntitySubServices(AccountSubscribeDbContext context) : base(context)
        {
        }

        [CapSubscribe("TurkcellDigitalSchool.Exam.Domain.Concrete.TestExam_Added")]
        public override async Task Added(TestExam entity)
        {
            await base.Added(entity);
        }

        [CapSubscribe("TurkcellDigitalSchool.Exam.Domain.Concrete.TestExam_Modified")]
        public override async Task Updated(TestExam entity)
        {
            await base.Updated(entity);
        }

        [CapSubscribe("TurkcellDigitalSchool.Exam.Domain.Concrete.TestExam_Deleted")]
        public override async Task Deleted(TestExam entity)
        {
            await base.Deleted(entity);
        }
    }
}
