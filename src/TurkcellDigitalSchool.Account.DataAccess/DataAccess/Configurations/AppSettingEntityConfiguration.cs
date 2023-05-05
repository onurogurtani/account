using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.DbAccess.DataAccess.Abstract; 

namespace TurkcellDigitalSchool.Account.DataAccess.DataAccess.Configurations
{
    public class AppSettingEntityConfiguration : EntityDefinitionConfigurationBase<AppSetting>
    {
        public override void Configure(EntityTypeBuilder<AppSetting> builder)
        {
            base.Configure(builder);
            builder.Property(x => x.Value).IsRequired(); 
        }
    }
}
