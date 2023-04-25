using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TurkcellDigitalSchool.Account.Domain.Concrete.ReadOnly; 

namespace TurkcellDigitalSchool.Account.DataAccess.ReadOnly.Configurations
{
    public class FileEntityConfiguration : IEntityTypeConfiguration<File>
    {
        public   void Configure(EntityTypeBuilder<File> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.FileType);
            builder.Property(x => x.FileName).HasMaxLength(250);
            builder.Property(x => x.FilePath).HasMaxLength(250);
            builder.Property(x => x.ContentType).HasMaxLength(100);
            builder.Property(x => x.Description).HasMaxLength(250);
        }
    }
}
