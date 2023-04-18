using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TurkcellDigitalSchool.Account.Domain.Concrete.ReadOnly;
using TurkcellDigitalSchool.DbAccess.DataAccess.Abstract;

namespace TurkcellDigitalSchool.Account.DataAccess.ReadOnly.Configurations
{
    public class ClassroomEntityConfiguration : EntityDefaultConfigurationBase<Classroom>
    {
        public override void Configure(EntityTypeBuilder<Classroom> builder)
        {
            base.Configure(builder);
            builder.Property(x => x.Name).HasMaxLength(100);
            builder.Property(x => x.IsActive).HasDefaultValue(false).IsRequired();
        }
    }
}
