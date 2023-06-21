using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.DataAccess.Abstract; 

namespace TurkcellDigitalSchool.Account.DataAccess.DataAccess.Configurations
{
    public class PackageEventEntityConfiguration : EntityDefaultConfigurationBase<PackageEvent>
    {
        public override void Configure(EntityTypeBuilder<PackageEvent> builder)
        {
            base.Configure(builder);
        }
    }
}
