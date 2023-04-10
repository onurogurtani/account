using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using TurkcellDigitalSchool.Account.Business.Handlers.ServiceMessages.Command;
using TurkcellDigitalSchool.Common.Controllers;

namespace TurkcellDigitalSchool.Account.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ServiceMessagesController : BaseApiController
    {
        [AllowAnonymous]
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Core.Utilities.Results.IResult))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpPost("createAppMessage")]
        public async Task<IActionResult> CreateAppMessage()
        {
            var result = await Mediator.Send(new CreateAppMessageCommand());
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }
    }
}
