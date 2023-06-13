using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.DataAccess.Abstract; 

namespace TurkcellDigitalSchool.Account.DataAccess.DataAccess.Configurations
{
    public class ParentEntityConfiguration : EntityDefaultConfigurationBase<Parent>
    {
        public override void Configure(EntityTypeBuilder<Parent> builder)
        {
            base.Configure(builder);
            builder.Property(x => x.UserId);
            builder.Property(x => x.NameSurname).HasMaxLength(100);
            builder.Property(x => x.Tc);
            builder.Property(x => x.Phone).HasMaxLength(30);
            builder.Property(x => x.Email).HasMaxLength(100);
            builder.Property(x => x.PasswordSalt);
            builder.Property(x => x.PasswordHash);
            builder.Property(x => x.ContactOption).HasMaxLength(100);
            builder.Property(x => x.NotificationStatus);
        }
    }
}
