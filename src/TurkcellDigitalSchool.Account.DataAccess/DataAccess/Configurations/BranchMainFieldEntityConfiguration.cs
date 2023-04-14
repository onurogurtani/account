using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.DbAccess.DataAccess.Abstract; 

namespace TurkcellDigitalSchool.Account.DataAccess.DataAccess.Configurations
{
    public class BranchMainFieldEntityConfiguration : EntityDefaultConfigurationBase<BranchMainField>
    {
        public override void Configure(EntityTypeBuilder<BranchMainField> builder)
        {
            base.Configure(builder);
        }
    }
}
