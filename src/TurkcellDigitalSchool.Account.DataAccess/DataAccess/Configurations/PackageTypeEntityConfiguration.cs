using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.DbAccess.DataAccess.Abstract; 

namespace TurkcellDigitalSchool.Account.DataAccess.DataAccess.Configurations
{
    public class PackageTypeEntityConfiguration : EntityDefaultConfigurationBase<PackageType>
    {
        public override void Configure(EntityTypeBuilder<PackageType> builder)
        {
            base.Configure(builder);
            builder.Property(x => x.Name).HasMaxLength(100);
            builder.Property(x => x.IsCanSeeTargetScreen).HasDefaultValue(false).IsRequired();
            builder.Property(x => x.IsActive).HasDefaultValue(false).IsRequired();
            builder.Property(x => x.InsertTime).HasDefaultValueSql("NOW()");
        }
    }
}
