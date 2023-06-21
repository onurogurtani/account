using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.DataAccess.Abstract; 

namespace TurkcellDigitalSchool.Account.DataAccess.DataAccess.Configurations
{
    public class OperationClaimEntityConfiguration : EntityDefaultConfigurationBase<OperationClaim>
    {
        public override void Configure(EntityTypeBuilder<OperationClaim> builder)
        {
            base.Configure(builder);
            builder.Property(x => x.Name).HasMaxLength(100);
            builder.Property(x => x.Alias).HasMaxLength(100);
            builder.Property(x => x.Description).HasMaxLength(100);
            builder.HasIndex(x => x.CategoryId);
            builder.Property(x => x.CategoryName).HasMaxLength(100);
            builder.HasIndex(x => x.VouId);
            builder.Property(x => x.VouName).HasMaxLength(100);
            builder.HasIndex(x => x.SegmentId);


        }
    }
}
