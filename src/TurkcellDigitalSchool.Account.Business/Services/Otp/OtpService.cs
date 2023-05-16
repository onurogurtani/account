using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Account.Domain.Enums.OTP;
using TurkcellDigitalSchool.Common;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Core.Utilities.Toolkit;

namespace TurkcellDigitalSchool.Account.Business.Services.Otp
{
    public class OtpService : IOtpService
    {
        private readonly IOneTimePasswordRepository _oneTimePasswordRepository;
        private readonly ConfigurationManager _configurationManager;
        public OtpService(IOneTimePasswordRepository oneTimePasswordRepository, ConfigurationManager configurationManager)
        {
            _oneTimePasswordRepository = oneTimePasswordRepository;
            _configurationManager = configurationManager;
        }
        public int GenerateOtp(long UserId, ChannelType ChanellTypeId, OtpServices ServiceId)
        {
            var existOtpCodes = _oneTimePasswordRepository.Query().Where(w => w.OtpStatusId == OtpStatus.NotUsed && w.UserId == UserId && w.ChannelTypeId == ChanellTypeId && w.ServiceId == ServiceId).ToList();
            existOtpCodes.ForEach(w => w.OtpStatusId = OtpStatus.Cancelled);
            _oneTimePasswordRepository.UpdateAndSave(existOtpCodes);


            int otp = RandomPassword.RandomNumberGenerator();
            if (_configurationManager.Mode != ApplicationMode.PROD)
                otp = 123456;

            var newRecord = new OneTimePassword
            {
                Code = otp,
                UserId = UserId,
                ChannelTypeId = ChanellTypeId,
                ServiceId = ServiceId,
                SendDate = DateTime.Now,
                OtpStatusId = OtpStatus.NotUsed
            };
            _oneTimePasswordRepository.CreateAndSave(newRecord);

            return otp;
        }

        public Result VerifyOtp(long UserId, ChannelType ChanellTypeId, OtpServices ServiceId, int Code)
        {
            var getOtp = _oneTimePasswordRepository.Query().FirstOrDefault(w => w.OtpStatusId == OtpStatus.NotUsed && w.UserId == UserId && w.ChannelTypeId == ChanellTypeId && w.ServiceId == ServiceId);
            if (getOtp == null)
            {
                return new Result(false, "Kod bulunamadı.");
            }

            if (getOtp.Code != Code)
            {
                return new Result(false, "Kod yanlıştır.");
            }

            // DijitalDershaneWebUI

            getOtp.ProcessDate = DateTime.Now;
            getOtp.OtpStatusId = OtpStatus.Used;

            _oneTimePasswordRepository.UpdateAndSave(getOtp);
            return new Result(true, "Başarılı.");
        }
    }
}
