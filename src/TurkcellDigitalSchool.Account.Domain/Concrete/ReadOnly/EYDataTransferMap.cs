using System;
using TurkcellDigitalSchool.Core.Entities;

namespace TurkcellDigitalSchool.Account.Domain.Concrete.ReadOnly
{
    public class EYDataTransferMap : IReadOnlyEntity
    {
        public long Id { get; set; }
        public bool IsDeleted { get; set; }
        public string Table { get; set; }
        public long NewEducationYearId { get; set; }
        public long OldId { get; set; }
        public long NewId { get; set; }
    }
}
