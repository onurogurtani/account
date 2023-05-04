using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.DbAccess.DataAccess.Abstract;

namespace TurkcellDigitalSchool.Account.DataAccess.DataAccess.Configurations
{
    public class DocumentEntityConfiguration : EntityDefaultConfigurationBase<Document>
    {
        public override void Configure(EntityTypeBuilder<Document> builder)
        {
            base.Configure(builder);
        }
    }
}
