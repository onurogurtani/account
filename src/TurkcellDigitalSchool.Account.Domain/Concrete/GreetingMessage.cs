using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using TurkcellDigitalSchool.Account.Domain.Concrete.ReadOnly;
using TurkcellDigitalSchool.Core.Entities;
using TurkcellDigitalSchool.Core.Enums;

namespace TurkcellDigitalSchool.Account.Domain.Concrete
{
    /// <summary>
    /// Karşılama Mesajları
    /// </summary>
    public class GreetingMessage : EntityDefault
    {
        public bool HasDateRange { get; set; }
        public string Content { get; set; }
        public string Description { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public uint? DayCount { get; set; }
        public uint? Order { get; set; }
        public RecordStatus RecordStatus { get; set; } = RecordStatus.Active;
        public long? FileId { get; set; }
        [JsonIgnore]
        public File File { get; set; }
    }
}
