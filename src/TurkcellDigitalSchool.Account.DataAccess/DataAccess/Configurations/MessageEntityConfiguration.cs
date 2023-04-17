using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TurkcellDigitalSchool.DbAccess.DataAccess.Abstract;
using TurkcellDigitalSchool.Entities.Concrete;

namespace TurkcellDigitalSchool.Account.DataAccess.DataAccess.Configurations
{
    public class MessageEntityConfiguration : EntityDefaultConfigurationBase<Message>
    {
        public override void Configure(EntityTypeBuilder<Message> builder)
        {
            base.Configure(builder);
            builder.Property(x => x.MessageKey);
            builder.Property(x => x.UsedClass);
            builder.Property(x => x.MessageNumber);
            builder.Property(x => x.MessageTypeId);
        }
    }
}
