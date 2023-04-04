﻿using System;
using System.Linq;
using System.Threading.Tasks;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Common;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Utilities.Toolkit;
using TurkcellDigitalSchool.Entities.Concrete.Core; 

namespace TurkcellDigitalSchool.Account.Business.Helpers
{
    public interface ISendOtpSmsHelper
    {
        Task<MobileLogin> SendOtpSms(AuthenticationProviderType providerType, string cellPhone, long userId);
    }

    public class SendOtpSmsHelper : ISendOtpSmsHelper
    {
        private readonly ConfigurationManager _configurationManager;
        private readonly IMobileLoginRepository _mobileLoginRepository;
        private readonly ISmsOtpRepository _smsOtpRepository;

        public SendOtpSmsHelper(ConfigurationManager configurationManager, IMobileLoginRepository mobileLoginRepository, ISmsOtpRepository smsOtpRepository)
        {
            _configurationManager = configurationManager;
            _mobileLoginRepository = mobileLoginRepository;
            _smsOtpRepository = smsOtpRepository;
        }

        public async Task<MobileLogin> SendOtpSms(AuthenticationProviderType providerType, string cellPhone, long userId)
        {
            var date = DateTime.Now;

            var mobileLogins = _mobileLoginRepository.Query()
                .Where(m => m.Provider == providerType && m.UserId == userId && m.Status == MobileSendStatus.Send)
                .Where(w => w.SendDate.AddSeconds(120) > date)
                .ToList();

            if (mobileLogins.Count > 0)
            {
                foreach (var item in mobileLogins)
                {
                    item.Status = MobileSendStatus.Cancelled;
                    _mobileLoginRepository.Update(item);
                }
                await _mobileLoginRepository.SaveChangesAsync();
            }

            int otp = RandomPassword.RandomNumberGenerator();
            if (_configurationManager.Mode == ApplicationMode.PRP)
                otp = 123456;

            if (_configurationManager.Mode != ApplicationMode.LOCAL && _configurationManager.Mode != ApplicationMode.DEV && _configurationManager.Mode != ApplicationMode.STB)
            {
                await _smsOtpRepository.ExecInsertSpForSms(cellPhone, userId, otp.ToString());
            }

            date = DateTime.Now;

            var mobileLogin = _mobileLoginRepository.Add(new MobileLogin
            {
                Code = otp,
                Status = MobileSendStatus.Send,
                SendDate = date,
                LastSendDate = date,
                UserId = userId,
                Provider = providerType,
                CellPhone = cellPhone,
                ReSendCount = 0
            });

            await _mobileLoginRepository.SaveChangesAsync();

            return mobileLogin;
        }
    }
}