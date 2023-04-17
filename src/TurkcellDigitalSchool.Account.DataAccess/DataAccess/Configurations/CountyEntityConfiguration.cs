using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.DbAccess.DataAccess.Abstract; 

namespace TurkcellDigitalSchool.Account.DataAccess.DataAccess.Configurations
{
    public class CountyEntityConfiguration : EntityDefinitionConfigurationBase<County>
    {
        public override void Configure(EntityTypeBuilder<County> builder)
        {
            base.Configure(builder);
            builder.Property(x => x.CityId);
        }
    }
}
