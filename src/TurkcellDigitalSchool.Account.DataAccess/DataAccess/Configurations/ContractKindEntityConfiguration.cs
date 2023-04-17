using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.DbAccess.DataAccess.Abstract; 

namespace TurkcellDigitalSchool.Account.DataAccess.DataAccess.Configurations
{
    public class ContractKindEntityConfiguration : EntityDefinitionConfigurationBase<ContractKind>
    {
        public override void Configure(EntityTypeBuilder<ContractKind> builder)
        {
            base.Configure(builder);
            builder.Property(x => x.Description).HasMaxLength(2000);

            builder.Property(x => x.InsertTime)
                .HasDefaultValueSql("NOW()");

            builder.Property(x => x.UpdateTime)
                .HasDefaultValueSql("NOW()");
        }
    }
}
