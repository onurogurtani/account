using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TurkcellDigitalSchool.Account.Domain.Enums.OTP;

namespace TurkcellDigitalSchool.Account.Domain.Dtos
{
    public class GenerateOtpReponseDto
    {
        public ChannelType ChannelTypeId { get; set; }
        public OtpServices ServiceId { get; set; }
        public int Code { get; set; }
    }
}
