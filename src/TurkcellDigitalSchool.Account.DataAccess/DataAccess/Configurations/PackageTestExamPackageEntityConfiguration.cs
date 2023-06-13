using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.DataAccess.Abstract; 

namespace TurkcellDigitalSchool.Account.DataAccess.DataAccess.Configurations
{
    public class PackageTestExamPackageEntityConfiguration : EntityDefaultConfigurationBase<PackageTestExamPackage>
    {
        public override void Configure(EntityTypeBuilder<PackageTestExamPackage> builder)
        {
            base.Configure(builder);
            builder.Property(x => x.PackageId);
            builder.Property(x => x.TestExamPackageId);
        }
    }
}
