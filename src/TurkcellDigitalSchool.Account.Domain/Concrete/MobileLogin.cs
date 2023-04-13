using System;
using TurkcellDigitalSchool.Core.Entities;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Entities.Concrete.Core;

namespace TurkcellDigitalSchool.Account.Entities.Concrete
{
    public class MobileLogin : EntityDefault
    {
        public AuthenticationProviderType Provider { get; set; }
        public string ExternalUserId { get; set; }
        public int Code { get; set; }
        public DateTime SendDate { get; set; }
        public DateTime LastSendDate { get; set; }
        public DateTime UsedDate { get; set; }
        public UsedStatus Status { get; set; }
        public long UserId { get; set; }
        public string CellPhone { get; set; }
        public int ReSendCount { get; set; } 
        public string NewPassGuid { get; set; } 
        public DateTime? NewPassGuidExp { get; set; } 
        public UsedStatus? NewPassStatus { get; set; }
    }
}
