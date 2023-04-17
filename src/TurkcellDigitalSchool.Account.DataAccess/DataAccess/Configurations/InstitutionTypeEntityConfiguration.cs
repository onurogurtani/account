using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.DbAccess.DataAccess.Abstract; 

namespace TurkcellDigitalSchool.Account.DataAccess.DataAccess.Configurations
{
    public class InstitutionTypeEntityConfiguration : EntityDefinitionConfigurationBase<InstitutionType>
    {
        public override void Configure(EntityTypeBuilder<InstitutionType> builder)
        {
            base.Configure(builder);
        }
    }
}
