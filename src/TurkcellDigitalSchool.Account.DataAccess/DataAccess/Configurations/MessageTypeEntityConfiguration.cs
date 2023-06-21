using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.DataAccess.Abstract; 

namespace TurkcellDigitalSchool.Account.DataAccess.DataAccess.Configurations
{
    public class MessageTypeEntityConfiguration : EntityDefinitionConfigurationBase<MessageType>
    {
        public override void Configure(EntityTypeBuilder<MessageType> builder)
        {
            base.Configure(builder);
            builder.Property(x => x.Count);
        }
    }
}
