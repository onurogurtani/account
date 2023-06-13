using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.DataAccess.Abstract;

namespace TurkcellDigitalSchool.Account.DataAccess.DataAccess.Configurations
{
    public class StudentEducationInformationEntityConfiguration : EntityDefaultConfigurationBase<StudentEducationInformation>
    {
        public override void Configure(EntityTypeBuilder<StudentEducationInformation> builder)
        {
            base.Configure(builder);
        }
    }
}
