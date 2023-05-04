using System.Threading.Tasks;
using DotNetCore.CAP;
using TurkcellDigitalSchool.Account.DataAccess.DataAccess.Contexts;
using TurkcellDigitalSchool.Account.Domain.Concrete.ReadOnly;
using TurkcellDigitalSchool.Core.SubServices;

namespace TurkcellDigitalSchool.Account.Business.SubServices
{
    public class EventEntitySubServices : BaseCrudSubServices<AccountSubscribeDbContext, Event>
    {
        public EventEntitySubServices(AccountSubscribeDbContext context) : base(context)
        {
        }

        [CapSubscribe("TurkcellDigitalSchool.Event.Domain.Concrete.Event_Added")]
        public override async Task Added(Event entity)
        {
            await base.Added(entity);
        }

        [CapSubscribe("TurkcellDigitalSchool.Event.Domain.Concrete.Event_Modified")]
        public override async Task Updated(Event entity)
        {
            await base.Updated(entity);
        }

        [CapSubscribe("TurkcellDigitalSchool.Event.Domain.Concrete.Event_Deleted")]
        public override async Task Deleted(Event entity)
        {
            await base.Deleted(entity);
        }
    }
}
