using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TurkcellDigitalSchool.Account.Business.Handlers.Admins.Commands;
using TurkcellDigitalSchool.Account.Business.Handlers.Admins.Queries;
using TurkcellDigitalSchool.Account.Domain.Dtos;
using TurkcellDigitalSchool.Common.Controllers;
using TurkcellDigitalSchool.Core.Utilities.Paging;
using TurkcellDigitalSchool.Core.Utilities.Results;

namespace TurkcellDigitalSchool.Account.Api.Controllers
{
    /// <summary>
    /// Admins If controller methods will not be Authorize, [AllowAnonymous] is used.
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class AdminsController : BaseApiController
    {

        ///<summary>
        ///Get Filtered Paged Admins  with Groups
        /// </summary>
        ///<return>PagedList AdminDtos</return>
        ///<response code="200"></response>
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IDataResult<PagedList<AdminDto>>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpPost("GetByFilterPagedAdmins")]
        public async Task<IActionResult> GetByFilterPagedAdmins([FromQuery] GetByFilterPagedAdminsQuery query, CancellationToken cancellationToken)
        {
            var result = await Mediator.Send(query, cancellationToken);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }




        ///<summary>
        ///Get Admin User with Groups
        ///</summary>
        ///<remarks>TEntity</remarks>
        ///<return>TEntity</return>
        ///<response code="200"></response>
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IDataResult<AdminDto>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpGet("getbyid")]
        public async Task<IActionResult> GetById([FromQuery] GetAdminQuery query, CancellationToken cancellationToken)
        {
            var result = await Mediator.Send(query, cancellationToken);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }

        /// <summary>
        /// SetStatus TEntity.
        /// </summary>
        /// <returns></returns>
        [Consumes("application/json")]
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Result))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpPost("setStatus")]
        public async Task<IActionResult> SetStatus([FromBody] SetStatusAdminCommand setStatusAdminCommand, CancellationToken cancellationToken)
        {
            var result = await Mediator.Send(setStatusAdminCommand, cancellationToken);
            if (result.Success)
            {
                return Ok(result);
            }

            return BadRequest(result);
        }

        /// <summary>
        /// Add TEntity with groups.
        /// </summary>
        /// <param name="createAdminCommand"></param>
        /// <returns></returns>
        [Consumes("application/json")]
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(DataResult<AdminDto>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpPost("Add")]
        public async Task<IActionResult> Add([FromBody] CreateAdminCommand createAdminCommand, CancellationToken cancellationToken)
        {
            var result = await Mediator.Send(createAdminCommand, cancellationToken);
            if (result.Success)
            {
                return Ok(result);
            }

            return BadRequest(result);
        }

        /// <summary>
        /// Update TEntity with groups.
        /// </summary>
        /// <param name="updateAdminCommand"></param>
        /// <returns></returns>
        [Consumes("application/json")]
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(DataResult<AdminDto>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpPut("Update")]
        public async Task<IActionResult> Update([FromBody] UpdateAdminCommand updateAdminCommand, CancellationToken cancellationToken)
        {
            var result = await Mediator.Send(updateAdminCommand, cancellationToken);
            if (result.Success)
            {
                return Ok(result);
            }

            return BadRequest(result);
        }

        /// <summary>
        /// Delete TEntity.
        /// </summary>
        /// <returns></returns>
        [Consumes("application/json")]
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Result))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpDelete("Delete")]
        public async Task<IActionResult> Delete([FromBody] DeleteAdminCommand deleteAdminCommand, CancellationToken cancellationToken)
        {
            var result = await Mediator.Send(deleteAdminCommand, cancellationToken);
            if (result.Success)
            {
                return Ok(result);
            }

            return BadRequest(result);
        }

        ///<summary>
        ///It brings the details according to its id.
        ///</summary>
        ///<remarks>TEntity</remarks>
        ///<return>TEntity</return>
        ///<response code="200"></response>
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IDataResult<OrganisationUsersDto>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpGet("GetOrganisationByAdminTypeQuery")]
        public async Task<IActionResult> GetOrganisationByAdminTypeQuery([FromQuery] GetOrganisationByAdminTypeQuery getOrganisationByAdminTypeQuery, CancellationToken cancellationToken)
        {
            var result = await Mediator.Send(getOrganisationByAdminTypeQuery, cancellationToken);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }

    }
}
