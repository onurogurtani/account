using System;
using TurkcellDigitalSchool.Core.Entities;
using TurkcellDigitalSchool.DbAccess.DataAccess.Abstract;
using TurkcellDigitalSchool.Entities.Enums;

namespace TurkcellDigitalSchool.Account.Domain.Concrete.ReadOnly
{
    public class Event : EntityDefault, IReadOnlyEntity
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public bool IsActive { get; set; }
        public bool IsPublised { get; set; }
        public bool IsDraft { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public EventTypeEnum EventTypeEnum { get; set; }
        public string KeyWords { get; set; }
        public LocationType LocationType { get; set; }
        public string? PhysicalAddress { get; set; }
    }
}
