using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TurkcellDigitalSchool.Account.Domain.Dtos;
using TurkcellDigitalSchool.Account.Domain.Enums.OTP;
using TurkcellDigitalSchool.Core.Utilities.Results;

namespace TurkcellDigitalSchool.Account.Business.Services.Otp
{
    public interface IOtpService
    {
        Result GenerateOtp(long UserId, ChannelType ChanellTypeId, OtpServices ServiceId, OTPExpiryDate oTPExpiryDate);
        Result VerifyOtp(long UserId, ChannelType ChanellTypeId, OtpServices ServiceId, int Code);

        Task<DataResult<GenerateOtpVisitorRegisterDto>> GenerateOtpVisitorRegister(string name, string surName, string email, string mobilPhone, OTPExpiryDate oTPExpiryDate);
    }
}
