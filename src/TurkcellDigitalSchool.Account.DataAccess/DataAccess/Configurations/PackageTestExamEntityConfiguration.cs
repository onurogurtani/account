﻿using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.DataAccess.Abstract;

namespace TurkcellDigitalSchool.Account.DataAccess.DataAccess.Configurations
{
    public class PackageTestExamEntityConfiguration : EntityDefaultConfigurationBase<PackageTestExam>
    {
        public override void Configure(EntityTypeBuilder<PackageTestExam> builder)
        {
            base.Configure(builder);
            builder.Property(x => x.TestExamId);
            builder.Property(x => x.PackageId);
            builder.Property(x => x.InsertTime).HasDefaultValueSql("NOW()");
        }
    }
}
