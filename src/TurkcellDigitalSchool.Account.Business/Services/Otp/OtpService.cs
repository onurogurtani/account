using DotNetCore.CAP;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TurkcellDigitalSchool.Account.Business.Constants;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.DataAccess.Concrete.EntityFramework;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Account.Domain.Dtos;
using TurkcellDigitalSchool.Account.Domain.Enums.OTP;
using TurkcellDigitalSchool.Core.Common;
using TurkcellDigitalSchool.Core.Common.Helpers;
using TurkcellDigitalSchool.Core.CustomAttribute;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.SubServiceConst;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Core.Utilities.Toolkit;

namespace TurkcellDigitalSchool.Account.Business.Services.Otp
{
    public class OtpService : IOtpService
    {
        private readonly IOneTimePasswordRepository _oneTimePasswordRepository;
        private readonly IUserRepository _userRepository;
        private readonly ISmsOtpRepository _smsOtpRepository;
        private readonly IVisitorRegisterRepository _visitorRegisterRepository;
        private readonly ConfigurationManager _configurationManager;
        private readonly ICapPublisher _capPublisher;
        public OtpService(IOneTimePasswordRepository oneTimePasswordRepository, ConfigurationManager configurationManager, IUserRepository userRepository, ICapPublisher capPublisher, ISmsOtpRepository smsOtpRepository, IVisitorRegisterRepository visitorRegisterRepository)
        {
            _oneTimePasswordRepository = oneTimePasswordRepository;
            _configurationManager = configurationManager;
            _userRepository = userRepository;
            _capPublisher = capPublisher;
            _smsOtpRepository = smsOtpRepository;
            _visitorRegisterRepository = visitorRegisterRepository;
        }

        [MessageConstAttr(MessageCodeType.Information)]
        private static string SuccessfulOperation = Messages.SuccessfulOperation;
        public Result GenerateOtp(long UserId, ChannelType ChanellTypeId, OtpServices ServiceId, OTPExpiryDate oTPExpiryDate)
        {
            var existOtpCodes = _oneTimePasswordRepository.Query().Any(w => w.OtpStatusId == OtpStatus.NotUsed && w.UserId == UserId && w.ChannelTypeId == ChanellTypeId && w.ServiceId == ServiceId && w.ExpiryDate > DateTime.Now);

            if (existOtpCodes)
            {
                return new Result(false, $"Yeni kod oluşturmak için {(int)oTPExpiryDate} sn dolmalıdır.");
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
            return new Result(true, SuccessfulOperation.PrepareRedisMessage());

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


            if (ServiceId == OtpServices.Sms_UserProfilePhoneVerify)
            {
                UpdateVerifyPhone(UserId);
            }
            if (ServiceId == OtpServices.Mail_UserProfileMailVerify)
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
        private async void SendOtp(int otpCode, ChannelType chanellTypeId, OtpServices serviceId, long userId)
        {
            var userInfo = _userRepository.Get(w => w.Id == userId);
            if (serviceId == OtpServices.Mail_UserProfileMailVerify)
            {
                var dictoryString = new Dictionary<string, string>();
                dictoryString.Add(EmailVerifyParameters.NameSurname, $"{userInfo.Name} {userInfo.SurName}");
                dictoryString.Add(EmailVerifyParameters.OtpCode, otpCode.ToString());
                dictoryString.Add(EmailVerifyParameters.RecipientAddress, userInfo.Email);
                await _capPublisher.PublishAsync(SubServiceConst.SENDING_EMAIL_ADDRESS_VERIFY_REQUEST, dictoryString);

            }
            else
            {
                await _smsOtpRepository.Send(userInfo.MobilePhones, $"Tek Kullanımlık Şifreniz : {otpCode}");
            }

        }

        public async Task<DataResult<GenerateOtpVisitorRegisterDto>>  GenerateOtpVisitorRegister(string name, string surName, string email, string mobilPhone, OTPExpiryDate oTPExpiryDate)
        {
            var existOtpCodes = _visitorRegisterRepository.Query().Any(w => w.IsCompleted == false && w.Name == name && w.SurName == surName && w.Email == email && w.MobilePhones == mobilPhone && w.ExpiryDate > DateTime.Now);

            if (existOtpCodes)
            {
                return new ErrorDataResult<GenerateOtpVisitorRegisterDto>($"Yeni kod oluşturmak için {(int)oTPExpiryDate} sn dolmalıdır.");
            }

            int smsOtpCode = RandomPassword.RandomNumberGenerator();
            int mailOtpCode = RandomPassword.RandomNumberGenerator();


            await _smsOtpRepository.Send(mobilPhone, $"Tek Kullanımlık Şifreniz : {smsOtpCode}");

            var dictoryString = new Dictionary<string, string>();
            dictoryString.Add(EmailVerifyParameters.NameSurname, $"{name} {surName}");
            dictoryString.Add(EmailVerifyParameters.OtpCode, mailOtpCode.ToString());
            dictoryString.Add(EmailVerifyParameters.RecipientAddress, email);
            await _capPublisher.PublishAsync(SubServiceConst.SENDING_EMAIL_ADDRESS_VERIFY_REQUEST, dictoryString);



            return new SuccessDataResult<GenerateOtpVisitorRegisterDto>(new GenerateOtpVisitorRegisterDto
            {
                MailOtpCode=mailOtpCode,
                SmsOtpCode=smsOtpCode,
            });
        }
    }
}
