using System;
using TurkcellDigitalSchool.Core.Entities;

namespace TurkcellDigitalSchool.Account.Domain.Concrete.ReadOnly
{
    public class EducationYear : IReadOnlyEntity
    {
        public long Id { get; set; }
        public bool IsDeleted { get; set; }
        public int StartYear { get; set; }
        public int EndYear { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
    }
}
