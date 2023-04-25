using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TurkcellDigitalSchool.Core.Services.KpsService;

namespace TurkcellDigitalSchool.Account.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class KpsController : Controller
    {
        private readonly IKpsService _kpsService;
        public KpsController(IKpsService kpsService)
        {
            _kpsService = kpsService;
        }

        ///<response code="200"></response>
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Core.Utilities.Results.IResult))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpPost("TcNoValidate")]
        public async Task<IActionResult> ValidateUser(long TCKNo, string FirstName, string LastName, int BirthYear, CancellationToken cancellationToken)
        {
            var result = await _kpsService.ValidateUser(TCKNo, FirstName, LastName, BirthYear);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }
    }
}
