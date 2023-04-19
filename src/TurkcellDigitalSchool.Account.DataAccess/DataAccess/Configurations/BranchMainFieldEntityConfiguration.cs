using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TurkcellDigitalSchool.Account.Domain.Concrete.ReadOnly; 

namespace TurkcellDigitalSchool.Account.DataAccess.DataAccess.Configurations
{
    public class BranchMainFieldEntityConfiguration : IEntityTypeConfiguration<BranchMainField>
    {
        public void Configure(EntityTypeBuilder<BranchMainField> builder)
        {
            builder.HasKey(e => e.Id); 
        }
    }
} 