﻿using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TurkcellDigitalSchool.Account.Domain.Concrete.ReadOnly;

namespace TurkcellDigitalSchool.Account.DataAccess.ReadOnly.Configurations
{
    public class TestExamTypeEntityConfiguration : IEntityTypeConfiguration<TestExamType>
    {
        public void Configure(EntityTypeBuilder<TestExamType> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Name).HasMaxLength(100);
            builder.Property(x => x.Description).HasMaxLength(100);
            builder.Property(x => x.IsActive).HasDefaultValue(true).IsRequired();
        }
    }
}
