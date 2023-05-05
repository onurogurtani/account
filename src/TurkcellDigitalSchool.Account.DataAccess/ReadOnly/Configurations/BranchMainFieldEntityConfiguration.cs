using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TurkcellDigitalSchool.Account.Domain.Concrete.ReadOnly;
using TurkcellDigitalSchool.DbAccess.DataAccess.Abstract;

namespace TurkcellDigitalSchool.Account.DataAccess.ReadOnly.Configurations
{
    public class BranchMainFieldEntityConfiguration : BaseConfigurationBase<BranchMainField>
    {
        public void Configure(EntityTypeBuilder<BranchMainField> builder)
        {
            builder.HasKey(x => x.Id);
        }
    }
}
