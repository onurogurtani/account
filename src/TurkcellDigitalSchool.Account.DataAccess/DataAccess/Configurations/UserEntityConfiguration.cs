using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TurkcellDigitalSchool.Account.Domain.Concrete;

namespace TurkcellDigitalSchool.Account.DataAccess.DataAccess.Configurations
{
    public class UserEntityConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.HasKey(x => x.Id);
            //builder.Property(x => x.CitizenId).IsRequired();
            builder.Property(x => x.Name).HasMaxLength(100);
            builder.Property(x => x.SurName).HasMaxLength(100);
            builder.Property(x => x.NameSurname).HasMaxLength(100);
            builder.Property(x => x.Email).HasMaxLength(50);
            builder.Property(x => x.EmailVerify).HasDefaultValue(false).IsRequired();
            builder.Property(x => x.Status).IsRequired();
            builder.Property(x => x.BirthDate);
            builder.Property(x => x.GenderId);
            builder.Property(x => x.RecordDate);
            builder.Property(x => x.Address).HasMaxLength(200);
            builder.Property(x => x.MobilePhones).HasMaxLength(30);
            builder.Property(x => x.MobilePhonesVerify).HasDefaultValue(false).IsRequired();
            builder.Property(x => x.Notes).HasMaxLength(500);
            builder.Property(x => x.LastPasswordChangeGuid).HasMaxLength(200);
            builder.Property(x => x.RelatedIdentity).HasMaxLength(2500);
            builder.Property(x => x.OAuthAccessToken).HasMaxLength(2500);
            builder.Property(x => x.RemindLater);
            builder.Property(x => x.ViewMyData);
            builder.Property(x => x.FailLoginCount).IsRequired(false);

            builder.HasIndex(x => x.CitizenId);
            builder.HasIndex(x => x.MobilePhones);

            builder.HasIndex(x => x.RelatedIdentity).IsUnique();

            builder.HasIndex(x => x.CitizenId).IsUnique();
            builder.HasIndex(x => x.Email).IsUnique();  
        }
    }
}
