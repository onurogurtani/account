using System;
using TurkcellDigitalSchool.Core.Entities;

namespace TurkcellDigitalSchool.Account.Domain.Concrete
{
    public class UserContrat : EntityDefault
    {
        public long UserId { get; set; }
        public long DocumentId { get; set; }
        public bool? IsAccepted { get; set; }
        public DateTime? AcceptedDate { get; set; }
        public bool IsLastVersion { get; set; }
        public User User { get; set; }
        public Document Document { get; set; }

    }
}
