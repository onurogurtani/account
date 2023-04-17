using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.DbAccess.DataAccess.Abstract; 

namespace TurkcellDigitalSchool.Account.DataAccess.DataAccess.Configurations
{
    public class OrganisationUserEntityConfiguration : EntityDefaultConfigurationBase<OrganisationUser>
    {
        public override void Configure(EntityTypeBuilder<OrganisationUser> builder)
        {
            base.Configure(builder);
            builder.Property(x => x.UserId);
            builder.Property(x => x.OrganisationId);
            builder.Property(x => x.IsActive).HasDefaultValue(false).IsRequired();

        }
    }
}
