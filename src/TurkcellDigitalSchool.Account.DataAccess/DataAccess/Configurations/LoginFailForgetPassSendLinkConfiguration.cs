using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TurkcellDigitalSchool.Account.Domain.Concrete;

namespace TurkcellDigitalSchool.Account.DataAccess.DataAccess.Configurations
{
    public class LoginFailForgetPassSendLinkConfiguration : IEntityTypeConfiguration<LoginFailForgetPassSendLink>
    {
        public void Configure(EntityTypeBuilder<LoginFailForgetPassSendLink> builder)
        {  
            builder.Property(x => x.Guid).HasMaxLength(120).IsRequired();
            builder.Property(x => x.UserId).IsRequired();
            builder.Property(x => x.CheckCount).IsRequired().HasDefaultValue(0);
   

      
            builder.Property(e => e.InsertTime).HasDefaultValueSql("NOW()");
            builder.Property(e => e.ExpDate).IsRequired();


            builder.Property(e => e.Id).UseIdentityColumn();
            builder.HasKey(e => e.Id);

            builder.HasIndex(x => new { x.Guid ,x.UserId });
            builder.HasIndex(x => x.ExpDate);
        }
    }
}
 