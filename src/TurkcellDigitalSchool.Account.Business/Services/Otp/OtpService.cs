using DotNetCore.CAP;
using System;
using System.Collections.Generic;
using System.Linq;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Account.Domain.Enums.OTP;
using TurkcellDigitalSchool.Common;
using TurkcellDigitalSchool.Core.SubServiceConst;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Core.Utilities.Toolkit;

namespace TurkcellDigitalSchool.Account.Business.Services.Otp
{
    public class OtpService : IOtpService
    {
        private readonly IOneTimePasswordRepository _oneTimePasswordRepository;
        private readonly IUserRepository _userRepository;

        private readonly ConfigurationManager _configurationManager;
        private readonly ICapPublisher _capPublisher;
        public OtpService(IOneTimePasswordRepository oneTimePasswordRepository, ConfigurationManager configurationManager, IUserRepository userRepository, ICapPublisher capPublisher)
        {
            _oneTimePasswordRepository = oneTimePasswordRepository;
            _configurationManager = configurationManager;
            _userRepository = userRepository;
            _capPublisher = capPublisher;
        }
        public DataResult<int> GenerateOtp(long UserId, ChannelType ChanellTypeId, OtpServices ServiceId, OTPExpiryDate oTPExpiryDate)
        {
            var existOtpCodes = _oneTimePasswordRepository.Query().Any(w => w.OtpStatusId == OtpStatus.NotUsed && w.UserId == UserId && w.ChannelTypeId == ChanellTypeId && w.ServiceId == ServiceId && w.ExpiryDate > DateTime.Now);

            if (existOtpCodes)
            {
                return new DataResult<int>(0, false, $"Yeni kod oluşturmak için {oTPExpiryDate} sn dolmalıdır.");

            }

            int otp = RandomPassword.RandomNumberGenerator();

            var newRecord = new OneTimePassword
            {
                Code = otp,
                UserId = UserId,
                ChannelTypeId = ChanellTypeId,
                ServiceId = ServiceId,
                SendDate = DateTime.Now,
                OtpStatusId = OtpStatus.NotUsed,
                ExpiryDate = DateTime.Now.AddSeconds((int)oTPExpiryDate)

            };
            _oneTimePasswordRepository.CreateAndSave(newRecord);

            SendOtp(otp, ChanellTypeId, ServiceId, UserId);

            return new DataResult<int>(data: otp, true, "Başarılı");
        }
        public Result VerifyOtp(long UserId, ChannelType ChanellTypeId, OtpServices ServiceId, int Code)
        {
            var getOtp = _oneTimePasswordRepository.Query().Where(w => w.OtpStatusId == OtpStatus.NotUsed && w.ExpiryDate > DateTime.Now && w.UserId == UserId && w.ChannelTypeId == ChanellTypeId && w.ServiceId == ServiceId).FirstOrDefault();
            if (getOtp == null)
            {
                return new Result(false, "Kod bulunamadı.");
            }

            if (getOtp.Code != Code)
            {
                return new Result(false, "Kod yanlıştır.");
            }
            getOtp.ProcessDate = DateTime.Now;
            getOtp.OtpStatusId = OtpStatus.Used;

            _oneTimePasswordRepository.UpdateAndSave(getOtp);


            if (ServiceId == OtpServices.Sms_StudentProfilePhoneVerify)
            {
                UpdateVerifyPhone(UserId);
            }
            if (ServiceId == OtpServices.Mail_StudentProfileMailVerify)
            {
                UpdateVerifyMail(UserId);
            }

            return new Result(true, "Başarılı.");
        }
        private void UpdateOldNotUsedOtpCode(long UserId, ChannelType ChanellTypeId, OtpServices ServiceId)
        {
            var existOtpCodes = _oneTimePasswordRepository.Query().Where(w => w.OtpStatusId == OtpStatus.NotUsed && w.UserId == UserId && w.ChannelTypeId == ChanellTypeId && w.ServiceId == ServiceId && w.ExpiryDate < DateTime.Now).ToList();
            existOtpCodes.ForEach(w => w.OtpStatusId = OtpStatus.Cancelled);
            _oneTimePasswordRepository.UpdateAndSave(existOtpCodes);
        }
        private void UpdateVerifyPhone(long userId)
        {
            var getUserInfo = _userRepository.Get(w => w.Id == userId);
            if (getUserInfo != null)
            {
                getUserInfo.MobilePhonesVerify = true;
                _userRepository.UpdateAndSave(getUserInfo);
            }
        }
        private void UpdateVerifyMail(long userId)
        {
            var getUserInfo = _userRepository.Get(w => w.Id == userId);
            if (getUserInfo != null)
            {
                getUserInfo.EmailVerify = true;
                _userRepository.UpdateAndSave(getUserInfo);
            }
        }
        private void SendOtp(int otpCode, ChannelType chanellTypeId, OtpServices serviceId, long userId)
        {

            var userInfo = _userRepository.Get(w => w.Id == userId);
            if (serviceId == OtpServices.Mail_StudentProfileMailVerify)
            {
                var dictoryString = new Dictionary<string, string>();
                dictoryString.Add(EmailVerifyParameters.NameSurname, $"{userInfo.Name} {userInfo.SurName}");
                dictoryString.Add(EmailVerifyParameters.OtpCode, otpCode.ToString());
                dictoryString.Add(EmailVerifyParameters.RecipientAddress, userInfo.Email);
                _capPublisher.Publish(SubServiceConst.SENDING_EMAIL_ADDRESS_VERIFY_REQUEST, dictoryString);
            }

            //todo sms için servis bağlanacak.
        }

    }
}
