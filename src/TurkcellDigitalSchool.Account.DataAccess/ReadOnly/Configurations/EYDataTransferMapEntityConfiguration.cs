using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TurkcellDigitalSchool.Account.Domain.Concrete.ReadOnly;
using TurkcellDigitalSchool.Core.DataAccess.Abstract;

namespace TurkcellDigitalSchool.Account.DataAccess.ReadOnly.Configurations
{
    public class EYDataTransferMapEntityConfiguration : BaseConfigurationBase<EYDataTransferMap>
    {
        public override void Configure(EntityTypeBuilder<EYDataTransferMap> builder)
        {
            base.Configure(builder);
        }
    }
}
