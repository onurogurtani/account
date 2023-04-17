using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.DbAccess.DataAccess.Abstract; 

namespace TurkcellDigitalSchool.Account.DataAccess.DataAccess.Configurations
{
    public class PackageTypeTargetScreenEntityConfiguration : EntityDefaultConfigurationBase<PackageTypeTargetScreen>
    {
        public override void Configure(EntityTypeBuilder<PackageTypeTargetScreen> builder)
        {
            base.Configure(builder);
            builder.Property(x => x.TargetScreenId);
            builder.Property(x => x.PackageTypeId);
            builder.Property(x => x.InsertTime).HasDefaultValueSql("NOW()");
        }
    }
}
