using System;
using System.Text.Json.Serialization;
using TurkcellDigitalSchool.Core.Entities;

namespace TurkcellDigitalSchool.Account.Domain.Concrete
{
    public class UserPackage : EntityDefault
    {
        public long UserId { get; set; }
        [JsonIgnore]
        public virtual User User { get; set; }
        public long PackageId { get; set; }
        [JsonIgnore]
        public virtual Package Package { get; set; }
        public DateTime PurchaseDate { get; set; }
    }
} 