using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.DbAccess.DataAccess.Abstract; 

namespace TurkcellDigitalSchool.Account.DataAccess.DataAccess.Configurations
{
    public class GraduationYearEntityConfiguration : EntityDefinitionConfigurationBase<GraduationYear>
    {
        public override void Configure(EntityTypeBuilder<GraduationYear> builder)
        {
            base.Configure(builder);
        }
    }
}