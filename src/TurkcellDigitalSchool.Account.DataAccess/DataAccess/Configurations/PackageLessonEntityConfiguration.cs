using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.DbAccess.DataAccess.Abstract; 

namespace TurkcellDigitalSchool.Account.DataAccess.DataAccess.Configurations
{
    public class PackageLessonEntityConfiguration : EntityDefaultConfigurationBase<PackageLesson>
    {
        public override void Configure(EntityTypeBuilder<PackageLesson> builder)
        {
            base.Configure(builder);
            builder.Property(x => x.PackageId);
            builder.Property(x => x.LessonId);
            builder.Property(x => x.InsertTime).HasDefaultValueSql("NOW()");
        }
    }
}
