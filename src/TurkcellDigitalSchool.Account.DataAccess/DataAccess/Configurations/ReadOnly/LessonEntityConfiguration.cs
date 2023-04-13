using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TurkcellDigitalSchool.Account.Domain.Concrete.ReadOnly;
using TurkcellDigitalSchool.DbAccess.DataAccess.Abstract; 

namespace TurkcellDigitalSchool.Account.DataAccess.DataAccess.Configurations.ReadOnly
{
    public class LessonEntityConfiguration : EntityDefaultConfigurationBase<Lesson>
    {
        public override void Configure(EntityTypeBuilder<Lesson> builder)
        {
            base.Configure(builder);
            builder.Property(x => x.Name).HasMaxLength(300);
            builder.Property(x => x.Order);
            builder.Property(x => x.IsActive).HasDefaultValue(false).IsRequired(); 
        }
    }
}
