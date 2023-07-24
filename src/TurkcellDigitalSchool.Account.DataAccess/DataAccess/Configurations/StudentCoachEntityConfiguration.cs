using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.DataAccess.Abstract;

namespace TurkcellDigitalSchool.Account.DataAccess.DataAccess.Configurations
{
    public class StudentCoachEntityConfiguration : EntityDefaultConfigurationBase<StudentCoach>
    {
        public override void Configure(EntityTypeBuilder<StudentCoach> builder)
        {
            base.Configure(builder);
        }
    }
}
