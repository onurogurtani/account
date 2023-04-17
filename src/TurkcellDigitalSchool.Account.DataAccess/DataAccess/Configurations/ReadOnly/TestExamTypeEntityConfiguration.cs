using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TurkcellDigitalSchool.Account.Domain.Concrete.ReadOnly;
using TurkcellDigitalSchool.DbAccess.DataAccess.Abstract;

namespace TurkcellDigitalSchool.Account.DataAccess.DataAccess.Configurations.ReadOnly
{
    public class TestExamTypeEntityConfiguration : EntityDefaultConfigurationBase<TestExamType>
    {
        public override void Configure(EntityTypeBuilder<TestExamType> builder)
        {
            base.Configure(builder);
            builder.Property(x => x.Name).HasMaxLength(100);
            builder.Property(x => x.Description).HasMaxLength(100);
            builder.Property(x => x.IsActive).HasDefaultValue(true).IsRequired();

            builder.Property(x => x.InsertTime).HasDefaultValueSql("NOW()");
        }
    }
}
