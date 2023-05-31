using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.DbAccess.DataAccess.Abstract; 

namespace TurkcellDigitalSchool.Account.DataAccess.DataAccess.Configurations
{
    public class LdapInfoEntityConfiguration : EntityDefaultConfigurationBase<LdapUserInfo>
    {
        public override void Configure(EntityTypeBuilder<LdapUserInfo> builder)
        {
            base.Configure(builder);            
            builder.HasKey(x => x.Id);
            builder.Property(x => x.UId).HasMaxLength(50);            
            builder.Property(x => x.Mail).HasMaxLength(50).IsRequired(false);
            builder.HasIndex(x => x.Mail).IsUnique();
            builder.Property(x => x.Mobile).HasMaxLength(30);
            builder.Property(x => x.FullName).HasMaxLength(150);
            builder.Property(x => x.ObjectClass).HasMaxLength(30);
            builder.Property(x => x.Group).HasMaxLength(30);
            builder.Property(x => x.PositionName).HasMaxLength(50);
            builder.Property(x => x.Sn).HasMaxLength(30);
            builder.Property(x => x.BirthDate);
            builder.Property(x => x.UnitName).HasMaxLength(50);
            builder.Property(x => x.DivisionGroupName).HasMaxLength(50);
            builder.Property(x => x.ManagerName).HasMaxLength(100);
            builder.Property(x => x.Status).IsRequired();            
        }
    }
}
