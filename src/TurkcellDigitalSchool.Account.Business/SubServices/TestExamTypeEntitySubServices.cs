using System.Threading.Tasks;
using DotNetCore.CAP;
using TurkcellDigitalSchool.Account.DataAccess.DataAccess.Contexts;
using TurkcellDigitalSchool.Account.Domain.Concrete.ReadOnly;
using TurkcellDigitalSchool.Core.SubServices;

namespace TurkcellDigitalSchool.Account.Business.SubServices
{
    public class TestExamTypeEntitySubServices : BaseCrudSubServices<AccountSubscribeDbContext, TestExamType>
    {
        public TestExamTypeEntitySubServices(AccountSubscribeDbContext context) : base(context)
        {
        }

        [CapSubscribe("TurkcellDigitalSchool.Exam.Domain.Concrete.TestExamType_Added")]
        public override async Task Added(TestExamType entity)
        {
            await base.Added(entity);
        }

        [CapSubscribe("TurkcellDigitalSchool.Exam.Domain.Concrete.TestExamType_Modified")]
        public override async Task Updated(TestExamType entity)
        {
            await base.Updated(entity);
        }

        [CapSubscribe("TurkcellDigitalSchool.Exam.Domain.Concrete.TestExamType_Deleted")]
        public override async Task Deleted(TestExamType entity)
        {
            await base.Deleted(entity);
        }
    }
}
