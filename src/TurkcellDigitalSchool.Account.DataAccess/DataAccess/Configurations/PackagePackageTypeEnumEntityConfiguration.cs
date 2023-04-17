using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.DbAccess.DataAccess.Abstract; 

namespace TurkcellDigitalSchool.Account.DataAccess.DataAccess.Configurations
{
    public class PackagePackageTypeEnumEntityConfiguration : EntityDefaultConfigurationBase<PackagePackageTypeEnum>
    {
        public override void Configure(EntityTypeBuilder<PackagePackageTypeEnum> builder)
        {
            base.Configure(builder);
            builder.Property(x => x.PackageId);
            builder.Property(x => x.PackageTypeEnum);
        }
    }
}
