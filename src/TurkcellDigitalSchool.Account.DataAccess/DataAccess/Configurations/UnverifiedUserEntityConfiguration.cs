using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.DataAccess.Abstract; 

namespace TurkcellDigitalSchool.Account.DataAccess.DataAccess.Configurations
{
    public class UnverifiedUserEntityConfiguration : EntityDefaultConfigurationBase<UnverifiedUser>
    {
        public override void Configure(EntityTypeBuilder<UnverifiedUser> builder)
        {
            base.Configure(builder); 
        }
    }
}
