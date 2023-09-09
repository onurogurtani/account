using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TurkcellDigitalSchool.Account.Domain.Enums.OTP
{
    public enum OtpServices
    {
        Sms_Login=1,
        Sms_UserProfilePhoneVerify=2,
        Mail_UserProfileMailVerify = 3,
        
        Sms_Public_Microsite_Visitor_Register=4,
        Mail_Public_Microsite_Visitor=5,

        Sms_Public_Microsite_Parent_Student_Register = 6,
        Mail_Public_Microsite_Parent_Student_Register = 7,
    }
}
