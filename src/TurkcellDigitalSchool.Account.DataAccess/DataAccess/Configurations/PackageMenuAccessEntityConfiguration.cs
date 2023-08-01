using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.DataAccess.Abstract;

namespace TurkcellDigitalSchool.Account.DataAccess.DataAccess.Configurations
{
    public class PackageMenuAccessEntityConfiguration : EntityDefaultConfigurationBase<PackageMenuAccess>
    {
        public override void Configure(EntityTypeBuilder<PackageMenuAccess> builder)
        { 
            base.Configure(builder);
            builder.Property(x => x.Claim).HasMaxLength(300).IsRequired(); 
            builder.HasIndex(x => new { x.PackageId, x.Claim}).IsUnique(); 
            builder.HasIndex(x => x.PackageId); 
        }
    }
}
