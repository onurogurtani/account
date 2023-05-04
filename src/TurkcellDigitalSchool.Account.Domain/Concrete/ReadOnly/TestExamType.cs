﻿using TurkcellDigitalSchool.Core.Entities; 

namespace TurkcellDigitalSchool.Account.Domain.Concrete.ReadOnly
{
    public class TestExamType : IReadOnlyEntity
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public bool IsActive { get; set; }
        public long Id { get; set; }
        public bool IsDeleted { get; set; }
    }
}
