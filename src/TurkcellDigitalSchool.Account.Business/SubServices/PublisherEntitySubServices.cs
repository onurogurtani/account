using System.Threading.Tasks;
using DotNetCore.CAP;
using TurkcellDigitalSchool.Account.DataAccess.DataAccess.Contexts;
using TurkcellDigitalSchool.Account.Domain.Concrete.ReadOnly;
using TurkcellDigitalSchool.Core.SubServices;

namespace TurkcellDigitalSchool.Account.Business.SubServices
{
    public class PublisherEntitySubServices : BaseCrudSubServices<AccountSubscribeDbContext, Publisher>
    {
        public PublisherEntitySubServices(AccountSubscribeDbContext context) : base(context)
        {
        }

        [CapSubscribe("TurkcellDigitalSchool.Exam.Domain.Concrete.Publisher_Added")]
        public override async Task Added(Publisher entity)
        {
            await base.Added(entity);
        }

        [CapSubscribe("TurkcellDigitalSchool.Exam.Domain.Concrete.Publisher_Modified")]
        public override async Task Updated(Publisher entity)
        {
            await base.Updated(entity);
        }

        [CapSubscribe("TurkcellDigitalSchool.Exam.Domain.Concrete.Publisher_Deleted")]
        public override async Task Deleted(Publisher entity)
        {
            await base.Deleted(entity);
        }
    }
}
