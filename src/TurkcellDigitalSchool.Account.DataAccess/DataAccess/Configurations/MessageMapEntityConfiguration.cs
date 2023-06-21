using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.DataAccess.Abstract; 

namespace TurkcellDigitalSchool.Account.DataAccess.DataAccess.Configurations
{
    internal class MessageMapEntityConfiguration : EntityDefaultConfigurationBase<MessageMap>
    {
        public override void Configure(EntityTypeBuilder<MessageMap> builder)
        {
            base.Configure(builder);
            builder.Property(x => x.Code).HasMaxLength(50);
            builder.Property(x => x.MessageKey).HasMaxLength(1000);
            builder.Property(x => x.Message).HasMaxLength(1000);
            builder.Property(x => x.UserFriendlyNameOfMessage).HasMaxLength(1000);
            builder.Property(x => x.OldVersionOfUserFriendlyMessage).HasMaxLength(1000);
            builder.Property(x => x.UsedClass).HasMaxLength(1000);
            builder.Property(x => x.DefaultNameOfUsedClass).HasMaxLength(1000);
            builder.Property(x => x.UserFriendlyNameOfUsedClass).HasMaxLength(1000);

            builder.HasIndex(x => new { x.MessageKey, x.UsedClass }).IsUnique();
        }
    }
}