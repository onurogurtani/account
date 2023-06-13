using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.DataAccess.Abstract; 

namespace TurkcellDigitalSchool.Account.DataAccess.DataAccess.Configurations
{
    public class DocumentContractTypeEntityConfiguration : EntityDefaultConfigurationBase<DocumentContractType>
    {
        public override void Configure(EntityTypeBuilder<DocumentContractType> builder)
        {
            builder.Property(x => x.ContractTypeId);

            base.Configure(builder);
        }
    }
}
