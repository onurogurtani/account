﻿using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.DataAccess.Abstract;

namespace TurkcellDigitalSchool.Account.DataAccess.DataAccess.Configurations
{
    public class StudentParentInformationEntityConfiguration : EntityDefaultConfigurationBase<StudentParentInformation>
    {
        public override void Configure(EntityTypeBuilder<StudentParentInformation> builder)
        {
            base.Configure(builder);
        }
    }
}
