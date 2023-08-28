
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
             
           // var constring2 = _conf.GetValue<string>("ConnectionStrings:DArchPostgreContext");
           // var EuroMessageUserName = _conf.GetValue<string>("EuroMessageConfiguration:UserName");
           // var EuroMessagePass = _conf.GetValue<string>("EuroMessageConfiguration:Password");

           // var SmsConfigurationUser = _conf.GetValue<string>("SmsConfiguration:User");
           // var SmsConfigurationPass = _conf.GetValue<string>("SmsConfiguration:Password"); 
           // var SmsConfigurationContentId = _conf.GetValue<string>("SmsConfiguration:ContentId"); 

           // var Kaltura = _conf.GetValue<string>("Kaltura:Secret"); 
           // var CaptchaOptions = _conf.GetValue<string>("CaptchaOptions:SecretKey");
            
         var CapConfigPass = _conf.GetValue<string>("RedisConfig:Password"); 


           // var envDeger = Environment.GetEnvironmentVariable("SecretTest:TestText");
           // var result = " constring2 : " + (constring2 ?? "") + Environment.NewLine +
           //" EuroMessageUserName : " + (EuroMessageUserName ?? "") + Environment.NewLine +
           //" EuroMessagePass : " + (EuroMessagePass ?? "") + Environment.NewLine +
           //" SmsConfigurationUser : " + (SmsConfigurationUser ?? "") + Environment.NewLine +
           //" SmsConfigurationPass : " + (SmsConfigurationPass ?? "") + Environment.NewLine +
           //" SmsConfigurationContentId : " + (SmsConfigurationContentId ?? "") + Environment.NewLine +
           //" KalturaSecret : " + (Kaltura ?? "") + Environment.NewLine +
           //" CaptchaOptionsSecretKey : " + (CaptchaOptions ?? "") + Environment.NewLine +
           //" CapConfigPass : " + (CapConfigPass ?? "") + Environment.NewLine ;


            return CapConfigPass
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
