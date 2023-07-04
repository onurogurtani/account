using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.DataAccess.Abstract;

namespace TurkcellDigitalSchool.Account.DataAccess.DataAccess.Configurations
{
    public class GreetingMessageEntityConfiguration : EntityDefaultConfigurationBase<GreetingMessage>
    {
        public override void Configure(EntityTypeBuilder<GreetingMessage> builder)
        {
            base.Configure(builder);
        }
    }
}
