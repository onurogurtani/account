using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.DbAccess.DataAccess.Abstract; 

namespace TurkcellDigitalSchool.Account.DataAccess.DataAccess.Configurations
{
    public class PackageFieldTypeEntityConfiguration : EntityDefaultConfigurationBase<PackageFieldType>
    {
        public override void Configure(EntityTypeBuilder<PackageFieldType> builder)
        {
            base.Configure(builder);
            builder.Property(x => x.PackageId);
            builder.Property(x => x.FieldType);
        }
    }
}
