
using System;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Threading;

namespace TurkcellDigitalSchool.Account.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HealthController : ControllerBase
    {
        private readonly IConfiguration _conf;
        public HealthController(IConfiguration conf)
        {
            _conf = conf;
        }


        [HttpGet("ping")]
        [AllowAnonymous]
        public string Ping()
        {
            var constring1 = _conf.GetValue<string>("ConnectionStrings1:DArchPostgreLocalContext");
            var constring2 = _conf.GetValue<string>("ConnectionStrings1:DArchPostgreContext");
            var EuroMessageUserName = _conf.GetValue<string>("EuroMessageConfiguration1:UserName");
            var EuroMessagePass = _conf.GetValue<string>("EuroMessageConfiguration1:Password");

            var SmsConfigurationUser = _conf.GetValue<string>("SmsConfiguration1:User");
            var SmsConfigurationPass = _conf.GetValue<string>("SmsConfiguration1:Password");
            var SmsConfigurationContentId = _conf.GetValue<string>("SmsConfiguration1:ContentId");


            var envDeger = Environment.GetEnvironmentVariable("SecretTest:TestText");
            var result = " constring1 : " + (constring1 ?? "") + Environment.NewLine +
           " constring2 : " + (constring2 ?? "") + Environment.NewLine +
           " EuroMessageUserName : " + (EuroMessageUserName ?? "") + Environment.NewLine +
           " EuroMessagePass : " + (EuroMessagePass ?? "") + Environment.NewLine +
           " SmsConfigurationUser : " + (SmsConfigurationUser ?? "") + Environment.NewLine +
           " SmsConfigurationPass : " + (SmsConfigurationPass ?? "") + Environment.NewLine +
           " SmsConfigurationContentId : " + (SmsConfigurationContentId ?? "") + Environment.NewLine;


            return result;
        }


        [HttpGet("test")]
        [AllowAnonymous]
        public string Test()
        {
            var address = _conf.GetValue<string>("Consul:AppUrl");
            Thread.Sleep(TimeSpan.FromSeconds(10));
            return address;
        }
    }
}
