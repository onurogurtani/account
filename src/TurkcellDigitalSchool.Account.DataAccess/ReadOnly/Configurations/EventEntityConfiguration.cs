using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TurkcellDigitalSchool.Account.Domain.Concrete.ReadOnly;
using TurkcellDigitalSchool.DbAccess.DataAccess.Abstract;

namespace TurkcellDigitalSchool.Account.DataAccess.ReadOnly.Configurations
{
    public class EventEntityConfiguration : BaseConfigurationBase<Event>
    {
        public override void Configure(EntityTypeBuilder<Event> builder)
        {
            base.Configure(builder);
            builder.HasKey(x => x.Id); 
            builder.Property(x => x.Name).HasMaxLength(100);
            builder.Property(x => x.Description).HasMaxLength(100);
            builder.Property(x => x.IsActive).HasDefaultValue(false).IsRequired();
            builder.Property(x => x.FormId);
            builder.Property(x => x.StartDate);
            builder.Property(x => x.EndDate);
        }
    }
}
