using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TurkcellDigitalSchool.Account.Domain.Enums.OTP;
using TurkcellDigitalSchool.Core.Entities;

namespace TurkcellDigitalSchool.Account.Domain.Concrete
{
    public class PublicOneTimePassword : EntityDefault
    {
        public Guid SessionCode { get; set; }
        public Guid VerificationSessionCode { get; set; }

        public ChannelType ChannelTypeId { get; set; }
        public OtpServices ServiceId { get; set; }
        public int Code { get; set; }
        public OtpStatus OtpStatusId { get; set; }
        public DateTime SendDate { get; set; }

        public DateTime ExpiryDate { get; set; }

        public DateTime? ProcessDate { get; set; }
    }
}
