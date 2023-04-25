using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TurkcellDigitalSchool.Account.Domain.Concrete.ReadOnly; 

namespace TurkcellDigitalSchool.Account.DataAccess.ReadOnly.Configurations
{
    public class PackageTestExamEntityConfiguration : IEntityTypeConfiguration<PackageTestExam>
    {
        public   void Configure(EntityTypeBuilder<PackageTestExam> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.TestExamId);
            builder.Property(x => x.PackageId); 
        }
    }
}
