using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.DataAccess.Abstract; 

namespace TurkcellDigitalSchool.Account.DataAccess.DataAccess.Configurations
{
    public class PackageRoleEntityConfiguration : EntityDefaultConfigurationBase<PackageRole>
    {
        public override void Configure(EntityTypeBuilder<PackageRole> builder)
        {
            base.Configure(builder);
            builder.Property(x => x.PackageId);
            builder.Property(x => x.RoleId);
        }
    }
}
