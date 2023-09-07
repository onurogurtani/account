using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.DataAccess.Abstract;

namespace TurkcellDigitalSchool.Account.DataAccess.DataAccess.Configurations
{
    public class UserSearchHistoryConfiguration : EntityDefaultConfigurationBase<UserSearchHistory>
    {
        public override void Configure(EntityTypeBuilder<UserSearchHistory> builder)
        {
            base.Configure(builder);
            builder.Property(x => x.Text).HasMaxLength(100);
        }
    }
}
