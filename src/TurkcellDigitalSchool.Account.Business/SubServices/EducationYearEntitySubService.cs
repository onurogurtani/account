using DotNetCore.CAP;
using System.Threading.Tasks;
using TurkcellDigitalSchool.Account.DataAccess.DataAccess.Contexts;
using TurkcellDigitalSchool.Account.Domain.Concrete.ReadOnly;
using TurkcellDigitalSchool.Core.SubServices;

namespace TurkcellDigitalSchool.Account.Business.SubServices
{
    public class EducationYearEntitySubService : BaseCrudSubServices<AccountSubscribeDbContext, EducationYear>
    {
        public EducationYearEntitySubService(AccountSubscribeDbContext context) : base(context)
        {
        }

        [CapSubscribe("TurkcellDigitalSchool.Education.Domain.Concrete.EducationYear_Added")]
        public override async Task Added(EducationYear entity)
        {
            await base.Added(entity);
        }

        [CapSubscribe("TurkcellDigitalSchool.Education.Domain.Concrete.EducationYear_Modified")]
        public override async Task Updated(EducationYear entity)
        {
            await base.Updated(entity);
        }

        [CapSubscribe("TurkcellDigitalSchool.Education.Domain.Concrete.EducationYear_Deleted")]
        public override async Task Deleted(EducationYear entity)
        {
            await base.Deleted(entity);
        }
    }
}
