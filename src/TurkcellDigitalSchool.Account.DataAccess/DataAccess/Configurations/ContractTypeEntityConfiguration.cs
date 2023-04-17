using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.DbAccess.DataAccess.Abstract; 

namespace TurkcellDigitalSchool.Account.DataAccess.DataAccess.Configurations
{
    public class ContractTypeEntityConfiguration : EntityDefinitionConfigurationBase<ContractType>
    {
        public override void Configure(EntityTypeBuilder<ContractType> builder)
        {
            base.Configure(builder);
            builder.Property(x => x.Description).HasMaxLength(1000);

            builder.Property(x => x.InsertTime)
                .HasDefaultValueSql("NOW()");

            builder.Property(x => x.UpdateTime)
                .HasDefaultValueSql("NOW()");
        }
    }
}
