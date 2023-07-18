using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TurkcellDigitalSchool.Core.Common.Controllers;
using TurkcellDigitalSchool.Core.Utilities.Paging;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Account.Business.Handlers.EYDataTransfers.Commands;
using System.Threading;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Account.Domain.Dtos;
using TurkcellDigitalSchool.Core.DataTransfers.Dto;
using TurkcellDigitalSchool.Account.Domain.Concrete.ReadOnly;

namespace TurkcellDigitalSchool.Account.Api.Controllers
{
    /// <summary>
    /// EYDataTransfers If controller methods will not be Authorize, [AllowAnonymous] is used.
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class EYDTAccountController : BaseApiController
    {
        /// <summary>
        /// Run Transfer
        /// </summary>
        /// <param name="command"></param>
        /// <returns></returns>
        [Consumes("application/json")]
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(DataResult<EYDataTransferMap>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpPost("RunEYDataTransfer")]
        public async Task<IActionResult> RunEYDataTransfer([FromBody] RunEYDTAccountCommand command, CancellationToken cancellationToken)
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
