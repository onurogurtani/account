using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.DbAccess.DataAccess.Abstract; 

namespace TurkcellDigitalSchool.Account.DataAccess.DataAccess.Configurations
{
    public class CountryEntityConfiguration : EntityDefinitionConfigurationBase<Country>
    {
        public override void Configure(EntityTypeBuilder<Country> builder)
        {
            base.Configure(builder);
            builder.Property(x => x.Name).HasMaxLength(100);
        }
    }
}
