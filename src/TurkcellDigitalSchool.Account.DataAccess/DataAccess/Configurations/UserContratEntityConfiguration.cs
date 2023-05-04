using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.DbAccess.DataAccess.Abstract;

namespace TurkcellDigitalSchool.Account.DataAccess.DataAccess.Configurations
{
    public class UserContratEntityConfiguration : EntityDefaultConfigurationBase<UserContrat>
    {
        public override void Configure(EntityTypeBuilder<UserContrat> builder)
        {
            base.Configure(builder);
        }
    }
}
