using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.DataAccess.Abstract; 

namespace TurkcellDigitalSchool.Account.DataAccess.DataAccess.Configurations
{
    public class SchoolEntityConfiguration : EntityDefinitionConfigurationBase<School>
    {
        public override void Configure(EntityTypeBuilder<School> builder)
        {
            base.Configure(builder);
            builder.Property(x => x.InstitutionId);
            builder.Property(x => x.InstitutionTypeId);
            builder.Property(x => x.CityId);
            builder.Property(x => x.CountyId);
        }
    }
}
