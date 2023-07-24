using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.DataAccess.Abstract;

namespace TurkcellDigitalSchool.Account.DataAccess.DataAccess.Configurations
{
    public class CoachLeaderCoachEntityConfiguration : EntityDefaultConfigurationBase<CoachLeaderCoach>
    {
        public override void Configure(EntityTypeBuilder<CoachLeaderCoach> builder)
        {
            base.Configure(builder);
        }
    }
}
