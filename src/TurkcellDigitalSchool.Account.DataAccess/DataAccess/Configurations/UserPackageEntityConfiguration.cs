using Microsoft.EntityFrameworkCore.Metadata.Builders; 
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.DbAccess.DataAccess.Abstract;

namespace TurkcellDigitalSchool.Account.DataAccess.DataAccess.Configurations
{
    public class UserPackageEntityConfiguration : EntityDefaultConfigurationBase<UserPackage>
    {
        public override void Configure(EntityTypeBuilder<UserPackage> builder)
        {
            base.Configure(builder); 
        }
    }
}
