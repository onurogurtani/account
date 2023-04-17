using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TurkcellDigitalSchool.Account.Domain.Concrete;

namespace TurkcellDigitalSchool.Account.DataAccess.DataAccess.Configurations
{
    public class MobileLoginEntityConfiguration : IEntityTypeConfiguration<MobileLogin>
    {
        public void Configure(EntityTypeBuilder<MobileLogin> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Code).HasMaxLength(50).IsRequired();
            builder.Property(x => x.Provider)
                    .IsRequired();
            builder.Property(x => x.ExternalUserId)
                    .HasMaxLength(20);
            builder.Property(x => x.SendDate);
            builder.Property(x => x.Status);
            builder.Property(x => x.LastSendDate);
            builder.Property(x => x.UsedDate);
            builder.Property(x => x.UserId);
            builder.Property(x => x.NewPassGuid).IsRequired(false).HasMaxLength(100);
            builder.Property(x => x.NewPassStatus).IsRequired(false);

            builder.HasIndex(x => new { x.UserId, x.ExternalUserId, x.Provider });
            builder.HasIndex(x => new { x.Id, x.NewPassGuid, x.NewPassStatus ,x.NewPassGuidExp });
        }
    }
}
