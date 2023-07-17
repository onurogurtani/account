using System.Threading.Tasks;
using DotNetCore.CAP;
using TurkcellDigitalSchool.Account.DataAccess.DataAccess.Contexts;
using TurkcellDigitalSchool.Account.Domain.Concrete.ReadOnly;
using TurkcellDigitalSchool.Core.SubServices;

namespace TurkcellDigitalSchool.Account.Business.SubServices
{
    public class EYDataTransferMapEntitySubServices : BaseCrudSubServices<AccountSubscribeDbContext, EYDataTransferMap>
    {
        public EYDataTransferMapEntitySubServices(AccountSubscribeDbContext context) : base(context)
        {
        }

        [CapSubscribe("TurkcellDigitalSchool.Education.Domain.Concrete.EYDataTransferMap_Added")]
        public override async Task Added(EYDataTransferMap entity)
        {
            await base.Added(entity);
        }

        [CapSubscribe("TurkcellDigitalSchool.Education.Domain.Concrete.EYDataTransferMap_Modified")]
        public override async Task Updated(EYDataTransferMap entity)
        {
            await base.Updated(entity);
        }

        [CapSubscribe("TurkcellDigitalSchool.Education.Domain.Concrete.EYDataTransferMap_Deleted")]
        public override async Task Deleted(EYDataTransferMap entity)
        {
            await base.Deleted(entity);
        }
    }
}
