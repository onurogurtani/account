using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TurkcellDigitalSchool.Account.Domain.Concrete;

namespace TurkcellDigitalSchool.Account.DataAccess.DataAccess.Configurations
{
    public class UserSessionEntityConfiguration : IEntityTypeConfiguration<UserSession>
    {
        public void Configure(EntityTypeBuilder<UserSession> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.LastTokenDate).IsRequired();
            builder.Property(x => x.UserId).IsRequired();

            builder.Property(x => x.StartTime).HasDefaultValueSql("NOW()").IsRequired();
            builder.Property(x => x.EndTime);
            builder.Property(x => x.RefreshToken).HasMaxLength(255);
            builder.Property(x => x.DeviceInfo).HasMaxLength(255);
            builder.Property(x => x.IpAdress).HasMaxLength(20);

            builder.HasIndex(x => new { x.UserId, x.SessionType,x.EndTime}).IsUnique(false);
            builder.HasIndex(x => new { x.StartTime }); 
        }
    }
}
