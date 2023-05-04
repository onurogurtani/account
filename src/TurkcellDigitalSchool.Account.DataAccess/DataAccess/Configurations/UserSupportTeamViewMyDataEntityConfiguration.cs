using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.DbAccess.DataAccess.Abstract;

namespace TurkcellDigitalSchool.Account.DataAccess.DataAccess.Configurations
{
    public class UserSupportTeamViewMyDataEntityConfiguration : EntityDefaultConfigurationBase<UserSupportTeamViewMyData>
    {
        public override void Configure(EntityTypeBuilder<UserSupportTeamViewMyData> builder)
        {
            base.Configure(builder);
        }
    }
}
