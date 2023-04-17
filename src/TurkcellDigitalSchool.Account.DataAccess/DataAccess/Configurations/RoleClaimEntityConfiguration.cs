using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.DbAccess.DataAccess.Abstract; 

namespace TurkcellDigitalSchool.Account.DataAccess.DataAccess.Configurations
{
    public class RoleClaimEntityConfiguration : EntityDefaultConfigurationBase<RoleClaim>
    {
        public override void Configure(EntityTypeBuilder<RoleClaim> builder)
        {
            base.Configure(builder);
            builder.Property(x => x.RoleId);
            builder.Property(x => x.ClaimName).HasMaxLength(100);
        }
    }
}
