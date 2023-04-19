using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TurkcellDigitalSchool.Account.Domain.Concrete.ReadOnly; 

namespace TurkcellDigitalSchool.Account.DataAccess.ReadOnly.Configurations
{
    public class ClassroomEntityConfiguration : IEntityTypeConfiguration<Classroom>
    {
        public void Configure(EntityTypeBuilder<Classroom> builder)
        {
            builder.HasKey(x => x.Id); 
            builder.Property(x => x.Name).HasMaxLength(100);
            builder.Property(x => x.IsActive).HasDefaultValue(false).IsRequired();
        }
    }
}
