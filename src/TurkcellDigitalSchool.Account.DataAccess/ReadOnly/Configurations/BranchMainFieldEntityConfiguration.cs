using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TurkcellDigitalSchool.Account.Domain.Concrete.ReadOnly;
using TurkcellDigitalSchool.Core.DataAccess.Abstract;

namespace TurkcellDigitalSchool.Account.DataAccess.ReadOnly.Configurations
{
    public class BranchMainFieldEntityConfiguration : BaseConfigurationBase<BranchMainField>
    {
        public override void Configure(EntityTypeBuilder<BranchMainField> builder)
        {
            base.Configure(builder);
            builder.HasKey(x => x.Id);
        }
    }
}
