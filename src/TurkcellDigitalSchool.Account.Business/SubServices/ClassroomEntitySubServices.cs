using System.Threading.Tasks;
using DotNetCore.CAP;
using TurkcellDigitalSchool.Account.DataAccess.DataAccess.Contexts;
using TurkcellDigitalSchool.Account.Domain.Concrete.ReadOnly;
using TurkcellDigitalSchool.Core.SubServices;

namespace TurkcellDigitalSchool.Account.Business.SubServices
{
    public class ClassroomEntitySubServices : BaseCrudSubServices<AccountSubscribeDbContext, Classroom>
    {
        public ClassroomEntitySubServices(AccountSubscribeDbContext context) : base(context)
        {
        }

        [CapSubscribe("TurkcellDigitalSchool.Education.Domain.Concrete.Classroom_Added")]
        public override async Task Added(Classroom entity)
        {
            await base.Added(entity);
        }

        [CapSubscribe("TurkcellDigitalSchool.Education.Domain.Concrete.Classroom_Modified")]
        public override async Task Updated(Classroom entity)
        {
            await base.Updated(entity);
        }

        [CapSubscribe("TurkcellDigitalSchool.Education.Domain.Concrete.Classroom_Deleted")]
        public override async Task Deleted(Classroom entity)
        {
            await base.Deleted(entity);
        }
    }
}
