﻿using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.Threading.Tasks;
using TurkcellDigitalSchool.Account.DataAccess.Abstract;
using TurkcellDigitalSchool.Account.DataAccess.DataAccess.Contexts;
using TurkcellDigitalSchool.Core.Common;
using TurkcellDigitalSchool.Core.DataAccess.EntityFramework;
using TurkcellDigitalSchool.Core.Entities;
using TurkcellDigitalSchool.Core.Enums;
using TurkcellDigitalSchool.Core.Services.SMS; 

namespace TurkcellDigitalSchool.Account.DataAccess.Concrete.EntityFramework
{
    public class SmsOtpRepository : EfEntityRepositoryBase<IEntityDefault, AccountDbContext>, ISmsOtpRepository
    {
        private readonly ConfigurationManager _configurationManager;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly ISendSms _sendSms;
        public SmsOtpRepository(AccountDbContext context, ConfigurationManager configurationManager, IHttpContextAccessor httpContextAccessor, ISendSms sendSms)
            : base(context)
        {
            _configurationManager = configurationManager;
            _httpContextAccessor = httpContextAccessor;
        }

        public Task<int> ExecInsertSpForSms(string cellPhone, long userId, string otp)
        {
            return Task<int>.FromResult<int>(1);
        }

        public Task<int> ExecUpdateSpForSms(string cellPhone, long userId, string otp)
        {
            return Task<int>.FromResult<int>(1);
        }

        public  Task<int> Send(string cellPhone, string message)
        {
            //var forceVal= _httpContextAccessor.HttpContext.Request.Headers["FORCE"];

            //var parseVal = false;
            //bool.TryParse(forceVal, out parseVal);
            //if (_configurationManager.Mode != ApplicationMode.DEV || parseVal)
            //{
            //    _sendSms.Send(new List<string> { cellPhone }, message);
            //} 
            _sendSms.Send(new List<string> { cellPhone }, message);
            return Task<int>.FromResult<int>(1);
        }
    }
}
