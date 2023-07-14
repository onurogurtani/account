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

namespace TurkcellDigitalSchool.Account.Api.Controllers
{
    /// <summary>
    /// UserPackages If controller methods will not be Authorize, [AllowAnonymous] is used.
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class UserPackagesController : BaseApiController
    {
        ///<summary>
        ///Get UserPackage By UserId 
        ///</summary>
        ///<return>List TEntitys</return>
        ///<response code="200"></response>
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(List<UserPackageDto>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpPost("getUserPackagesByUserId")]
        public async Task<IActionResult> GetUserPackagesByUserId([FromQuery] GetUserPackagesByUserIdQuery query, CancellationToken cancellationToken)
        {
            var result = await Mediator.Send(query, cancellationToken);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }

        ///<response code="200"></response>
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(List<long>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpGet("getUserPackageListQuery")]
        public async Task<IActionResult> GetUserPackageListQuery([FromQuery] GetUserPackageListQuery query, CancellationToken cancellationToken)
        {
            var result = await Mediator.Send(query, cancellationToken);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }

        [Produces("application/json", new string[] { "text/plain" })]
        [ProducesResponseType(200, Type = typeof(IEnumerable<UserPackage>))]
        [ProducesResponseType(400, Type = typeof(string))]
        [HttpPost("getList")]
        public async Task<IActionResult> GetList([FromQuery] PaginationQuery query, CancellationToken cancellationToken, [FromBody(EmptyBodyBehavior = EmptyBodyBehavior.Allow)] FilterQuery[] filterQuery = null)
        {
            DataResult<PagedList<UserPackage>> result = await base.Mediator.Send(new GetUserPackagesQuery
            {
                PaginationQuery = query,
                FilterQuery = filterQuery
            }, cancellationToken);
            if (result.Success)
            {
                return Ok(result);
            }

            return BadRequest(result);
        }

        [Produces("application/json", new string[] { "text/plain" })]
        [ProducesResponseType(200, Type = typeof(UserPackage))]
        [ProducesResponseType(400, Type = typeof(string))]
        [HttpGet("getbyid")]
        public async Task<IActionResult> GetById(long id, CancellationToken cancellationToken)
        {
            DataResult<UserPackage> result = await base.Mediator.Send(new GetUserPackageQuery
            {
                Id = id
            }, cancellationToken);
            if (result.Success)
            {
                return Ok(result);
            }

            return BadRequest(result);
        }

        [Produces("application/json", new string[] { "text/plain" })]
        [ProducesResponseType(200, Type = typeof(string))]
        [ProducesResponseType(400, Type = typeof(string))]
        [HttpPost]
        public async Task<IActionResult> Add([FromBody] CreateUserPackageCommand createTEntity, CancellationToken cancellationToken)
        {
            Core.Utilities.Results.IResult result = await base.Mediator.Send(createTEntity, cancellationToken);
            if (result.Success)
            {
                return Ok(result);
            }

            return BadRequest(result);
        }

        [Produces("application/json", new string[] { "text/plain" })]
        [ProducesResponseType(200, Type = typeof(string))]
        [ProducesResponseType(400, Type = typeof(string))]
        [HttpPut]
        public async Task<IActionResult> Update([FromBody] JsonElement json, CancellationToken cancellationToken)
        {
            DataResult<UserPackage> result = await base.Mediator.Send(json.ToUpdateCommand<UserPackage, UpdateUserPackageCommand>(), cancellationToken);
            if (result.Success)
            {
                return Ok(result);
            }

            return BadRequest(result);
        }

        [Produces("application/json", new string[] { "text/plain" })]
        [ProducesResponseType(200, Type = typeof(string))]
        [ProducesResponseType(400, Type = typeof(string))]
        [HttpDelete]
        public async Task<IActionResult> Delete(long id, CancellationToken cancellationToken)
        {
            DataResult<UserPackage> result = await base.Mediator.Send(new DeleteUserPackageCommand
            {
                Id = id
            }, cancellationToken);
            if (result.Success)
            {
                return Ok(result);
            }

            return BadRequest(result);
        }
    }
}
