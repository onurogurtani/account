using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TurkcellDigitalSchool.Account.Domain.Concrete.ReadOnly;
using TurkcellDigitalSchool.Core.DataAccess.Abstract;

namespace TurkcellDigitalSchool.Account.DataAccess.ReadOnly.Configurations
{
    public class EducationYearEntityConfiguration : BaseConfigurationBase<EducationYear>
    {
        public override void Configure(EntityTypeBuilder<EducationYear> builder)
        {
            base.Configure(builder);
            builder.Property(x => x.StartYear);
            builder.Property(x => x.EndYear);
        }
    }
}
