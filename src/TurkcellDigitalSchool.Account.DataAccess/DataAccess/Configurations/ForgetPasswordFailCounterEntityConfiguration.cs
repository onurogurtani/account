using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TurkcellDigitalSchool.Account.Domain.Concrete;

namespace TurkcellDigitalSchool.Account.DataAccess.DataAccess.Configurations
{
    public class ForgetPasswordFailCounterEntityConfiguration : IEntityTypeConfiguration<ForgetPasswordFailCounter>
    {
        public void Configure(EntityTypeBuilder<ForgetPasswordFailCounter> builder)
        {  
            builder.Property(x => x.CsrfToken).HasMaxLength(255);
            builder.Property(x => x.Id);
            builder.HasKey(e => e.Id); 

            builder.Property(e => e.Id).UseIdentityColumn(); 
            builder.Property(e => e.InsertTime).HasDefaultValueSql("NOW()");

            builder.HasIndex(x => x.CsrfToken);
            builder.HasIndex(x => x.InsertTime);
        }
    }
}
