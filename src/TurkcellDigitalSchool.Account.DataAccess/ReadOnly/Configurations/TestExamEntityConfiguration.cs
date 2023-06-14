using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TurkcellDigitalSchool.Account.Domain.Concrete.ReadOnly;
using TurkcellDigitalSchool.Core.DataAccess.Abstract;

namespace TurkcellDigitalSchool.Account.DataAccess.ReadOnly.Configurations
{
    public class TestExamEntityConfiguration : BaseConfigurationBase<TestExam>
    {
        public override void Configure(EntityTypeBuilder<TestExam> builder)
        {
            base.Configure(builder);
            builder.HasKey(x => x.Id);
            builder.Property(x => x.TestExamTypeId);
            builder.Property(x => x.IsLiveTestExam).HasDefaultValue(false).IsRequired();
            builder.Property(x => x.Name).HasMaxLength(100);
            builder.Property(x => x.ClassroomId);
            builder.Property(x => x.KeyWords);
            builder.Property(x => x.Difficulty);
            builder.Property(x => x.TestExamTime);
            builder.Property(x => x.StartDate);
            builder.Property(x => x.FinishDate);
            builder.Property(x => x.TestExamStatus);
            builder.Property(x => x.ExamKind);
            builder.Property(x => x.TransitionBetweenQuestions).HasDefaultValue(true).IsRequired();
            builder.Property(x => x.TransitionBetweenSections).HasDefaultValue(true).IsRequired();
            builder.Property(x => x.IsAllowDownloadPdf).HasDefaultValue(true).IsRequired();
        }
    }
}
