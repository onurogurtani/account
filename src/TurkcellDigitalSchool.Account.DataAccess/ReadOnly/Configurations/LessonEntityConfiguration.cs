using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TurkcellDigitalSchool.Account.Domain.Concrete.ReadOnly; 

namespace TurkcellDigitalSchool.Account.DataAccess.ReadOnly.Configurations
{
    public class LessonEntityConfiguration : IEntityTypeConfiguration<Lesson>
    {
        public void Configure(EntityTypeBuilder<Lesson> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Name).HasMaxLength(300);
            builder.Property(x => x.Order);
            builder.Property(x => x.IsActive).HasDefaultValue(false).IsRequired();
        }
    }
}
