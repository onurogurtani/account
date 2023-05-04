using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.DbAccess.DataAccess.Abstract;

namespace TurkcellDigitalSchool.Account.DataAccess.DataAccess.Configurations
{
    public class UserCommunicationPreferencesEntityConfiguration : EntityDefaultConfigurationBase<UserCommunicationPreferences>
    {
        public override void Configure(EntityTypeBuilder<UserCommunicationPreferences> builder)
        {
            base.Configure(builder);
        }
    }
}
