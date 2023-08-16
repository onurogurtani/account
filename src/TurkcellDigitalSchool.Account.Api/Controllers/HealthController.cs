
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
            var address1 = _conf.GetValue<string>("SecretTest:TestText");
            var address2 = _conf.GetValue<string>("TestText");

            var envDeger = Environment.GetEnvironmentVariable("TestText"); 
            var result = "Config Değer 1 : " + (address1 ?? "") +
                "Config Değer 2 : " + (address2 ?? "") +
                "  Env Değer : " + (envDeger ?? "");
             
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
