using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System.Threading;
using TurkcellDigitalSchool.Account.Business.Handlers.UserPackages.Queries;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Core.Common.Controllers;
using System.Collections.Generic;
using TurkcellDigitalSchool.Account.Business.Handlers.UserPackages.Commands;
using TurkcellDigitalSchool.Core.Utilities.Results;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using System.Text.Json;
using TurkcellDigitalSchool.Core.Utilities.Paging;
using TurkcellDigitalSchool.Core.Extensions;
using TurkcellDigitalSchool.Account.Business.Handlers.CoachLeaderCoaches.Commands;

namespace TurkcellDigitalSchool.Account.Api.Controllers
{
    /// <summary>
    /// CoachLeaderCoaches If controller methods will not be Authorize, [AllowAnonymous] is used.
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class CoachLeaderCoachesController : BaseApiController
    {
        [Produces("application/json", new string[] { "text/plain" })]
        [ProducesResponseType(200, Type = typeof(string))]
        [ProducesResponseType(400, Type = typeof(string))]
        [HttpPost]
        public async Task<IActionResult> Add([FromBody] CreateCoachLeaderCoachCommand command, CancellationToken cancellationToken)
        {
            var result = await Mediator.Send(command, cancellationToken);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }
    }
}
