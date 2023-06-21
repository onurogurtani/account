using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.DataAccess.Abstract; 
namespace TurkcellDigitalSchool.Account.DataAccess.DataAccess.Configurations
{
    public class EducationEntityConfiguration : EntityDefaultConfigurationBase<Education>
    {
        public override void Configure(EntityTypeBuilder<Education> builder)
        {
            base.Configure(builder);
            builder.Property(x => x.UserId);
            builder.Property(x => x.GraduationStatus).HasMaxLength(100);
            builder.Property(x => x.GraduationYear);
            builder.Property(x => x.DiplomaGrade).HasMaxLength(100);
            builder.Property(x => x.YKSExperienceInformation).HasMaxLength(100);
            builder.Property(x => x.School).HasMaxLength(100);
            builder.Property(x => x.Classroom).HasMaxLength(100);
            builder.Property(x => x.Field).HasMaxLength(100);
            builder.Property(x => x.IsReligiousCultureCourseMust).HasDefaultValue(false).IsRequired();
        }
    }
}
