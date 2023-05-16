using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TurkcellDigitalSchool.Account.Domain.Enums.OTP
{
    public enum OtpStatus
    {
        NotUsed=0,
        Used = 1,
        Cancelled=3
    }
}
