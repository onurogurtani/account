using System.Threading.Tasks;
using DotNetCore.CAP;
using TurkcellDigitalSchool.Account.DataAccess.DataAccess.Contexts;
using TurkcellDigitalSchool.Account.Domain.Concrete.ReadOnly;
using TurkcellDigitalSchool.Core.SubServices;

namespace TurkcellDigitalSchool.Account.Business.SubServices
{
    public class FileEntitySubServices : BaseCrudSubServices<AccountSubscribeDbContext, File>
    {
        public FileEntitySubServices(AccountSubscribeDbContext context) : base(context)
        {
        }

        [CapSubscribe("TurkcellDigitalSchool.File.Domain.Concrete.File_Added")]
        public override async Task Added(File entity)
        {
            await base.Added(entity);
        }

        [CapSubscribe("TurkcellDigitalSchool.File.Domain.Concrete.File_Modified")]
        public override async Task Updated(File entity)
        {
            await base.Updated(entity);
        }

        [CapSubscribe("TurkcellDigitalSchool.File.Domain.Concrete.File_Deleted")]
        public override async Task Deleted(File entity)
        {
            await base.Deleted(entity);
        }
    }
}
