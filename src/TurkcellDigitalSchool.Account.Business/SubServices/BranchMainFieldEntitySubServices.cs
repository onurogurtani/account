using System.Threading.Tasks;
using DotNetCore.CAP;
using TurkcellDigitalSchool.Account.DataAccess.DataAccess.Contexts;
using TurkcellDigitalSchool.Account.Domain.Concrete.ReadOnly;
using TurkcellDigitalSchool.Core.SubServices;

namespace TurkcellDigitalSchool.Account.Business.SubServices
{
    public class BranchMainFieldEntitySubServices : BaseCrudSubServices<AccountSubscribeDbContext, BranchMainField>
    {
        public BranchMainFieldEntitySubServices(AccountSubscribeDbContext context) : base(context)
        {
        }

        [CapSubscribe("TurkcellDigitalSchool.Education.Domain.Concrete.BranchMainField_Added")]
        public override async Task Added(BranchMainField entity)
        {
            await base.Added(entity);
        }

        [CapSubscribe("TurkcellDigitalSchool.Education.Domain.Concrete.BranchMainField_Modified")]
        public override async Task Updated(BranchMainField entity)
        {
            await base.Updated(entity);
        }

        [CapSubscribe("TurkcellDigitalSchool.Education.Domain.Concrete.BranchMainField_Deleted")]
        public override async Task Deleted(BranchMainField entity)
        {
            await base.Deleted(entity);
        }
    }
}
