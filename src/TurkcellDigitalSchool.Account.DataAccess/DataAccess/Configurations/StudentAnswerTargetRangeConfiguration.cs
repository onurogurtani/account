using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.DbAccess.DataAccess.Abstract; 

namespace TurkcellDigitalSchool.Account.DataAccess.DataAccess.Configurations
{
    public class StudentAnswerTargetRangeConfiguration : EntityDefaultConfigurationBase<StudentAnswerTargetRange>
    {
        public override void Configure(EntityTypeBuilder<StudentAnswerTargetRange> builder)
        {
            base.Configure(builder);
        }
    }
}
