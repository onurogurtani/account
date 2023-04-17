using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.DbAccess.DataAccess.Abstract; 

namespace TurkcellDigitalSchool.Account.DataAccess.DataAccess.Configurations
{
    public class InstitutionEntityConfiguration : EntityDefinitionConfigurationBase<Institution>
    {
        public override void Configure(EntityTypeBuilder<Institution> builder)
        {
            base.Configure(builder);
        }
    }
}
