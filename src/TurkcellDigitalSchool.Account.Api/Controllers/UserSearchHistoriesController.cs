using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System.Threading;
using TurkcellDigitalSchool.Core.Common.Controllers;
using TurkcellDigitalSchool.Core.Utilities.Results;
using TurkcellDigitalSchool.Account.Domain.Concrete;
using TurkcellDigitalSchool.Account.Business.Handlers.UserSearchHistories.Queries;

namespace TurkcellDigitalSchool.Account.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserSearchHistoriesController : BaseApiController
    {

        ///<summary>
        ///Get Last 10 Entities.
        ///</summary>
        ///<remarks>TEntity</remarks>
        ///<return>TEntity</return>
        ///<response code="200"></response>
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(DataResult<UserSearchHistory>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpGet("getList")]
        public async Task<IActionResult> GetList([FromQuery] GetUserSearchHistoryQuery query, CancellationToken cancellationToken)
        {
            var result = await Mediator.Send(query, cancellationToken);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }
    }
}
