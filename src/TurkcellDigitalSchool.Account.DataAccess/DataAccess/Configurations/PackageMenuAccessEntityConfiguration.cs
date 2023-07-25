using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.DataAccess.Abstract;

namespace TurkcellDigitalSchool.Account.DataAccess.DataAccess.Configurations
{
    public class PackageMenuAccessEntityConfiguration : EntityDefaultConfigurationBase<PackageMenuAccess>
    {
        public void Configure(EntityTypeBuilder<PackageMenuAccess> builder)
        { 
            builder.Property(x => x.Claim).HasMaxLength(300).IsRequired();
            builder.Property(x => x.Selected).IsRequired();  
            builder.HasIndex(x => new { x.PackageId, x.Claim}).IsUnique(); 
            builder.HasIndex(x => x.PackageId); 
        }
    }
}
