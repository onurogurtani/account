#nullable enable
using System;
using TurkcellDigitalSchool.Core.Entities;
using TurkcellDigitalSchool.Core.Enums;

namespace TurkcellDigitalSchool.Account.Domain.Concrete
{
    public class UserSession : EntityDefault
    {
        public long? UserId { get; set; }
        public virtual User User { get; set; }
        public DateTime LastTokenDate { get; set; }
        public int NotBefore { get; set; }
        public SessionType SessionType { get; set; }


        public DateTime StartTime { get; set; }
        public DateTime? EndTime { get; set; } 
        public string? RefreshToken { get; set; }
        public string? IpAdress { get; set; }
        public string? DeviceInfo { get; set; }
    }
}
