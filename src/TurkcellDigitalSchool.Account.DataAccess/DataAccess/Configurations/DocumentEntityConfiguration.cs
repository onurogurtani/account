using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TurkcellDigitalSchool.DbAccess.DataAccess.Abstract;
using TurkcellDigitalSchool.Entities.Concrete;

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
