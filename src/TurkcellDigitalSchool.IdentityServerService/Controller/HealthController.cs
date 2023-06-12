using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace TurkcellDigitalSchool.IdentityServerService.Controller
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
            return "OK";
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
